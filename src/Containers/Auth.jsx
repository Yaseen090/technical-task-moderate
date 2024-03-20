import { Component } from "react";
import Input from '../UI/Input/Input'
import Button from "../UI/Button/Button";
import classes from './Auth.css'
import auth from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import Customers from "./Customers";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Spinner from "../UI/Spinner/Spinner";
class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                touched: false,
                valid: false

            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Your Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                touched: false,
                valid: false

            },

        },
        isSignUp: true,
        signedIn: false,
        loading: false,
        error:false
    }
    componentDidMount() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.setState({ signedIn: true })
                console.log("User Signed In")
            } else {
                this.setState({ signedIn: false })

                console.log("User Signed Off")


            }
        });
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.authForm,
            [controlName]: {
                ...this.state.authForm[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.authForm[controlName].validation),
                touched: true
            }
        };
        this.setState({ authForm: updatedControls });
    }

    onAuthModeChanged = () => {
        this.setState(prevstate => {
            return {
                isSignUp: !prevstate.isSignUp,
                error:false
            }
        })
      
    }
    submitHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        if (this.state.isSignUp) {
            createUserWithEmailAndPassword(auth, this.state.authForm.email.value, this.state.authForm.password.value)
                .then((userCrendentials) => {
                    this.setState({ loading: false,error:false })
                }).catch((error) => {
                    this.setState({ loading: false,error:true })


                })
        }
        else {
            signInWithEmailAndPassword(auth, this.state.authForm.email.value, this.state.authForm.password.value)
                .then((userCrendentials) => {
                    this.setState({ loading: false,error:false })
                }).catch((error) => {
                    this.setState({ loading: false,error:true })
                })
        }
    }
    logoutHandler = () => {
        this.setState({ loading: true })
        signOut(auth)
            .then(e => {
                this.setState({ loading: false,signedIn:false,error:false })
                const updatedControls = {
                    ...this.state.authForm,
                    email: {
                        ...this.state.authForm.email,
                        value: '',
                    },
                    password: {
                        ...this.state.authForm.password,
                        value: '',
                    },
                };
                this.setState({ authForm: updatedControls });
            }).catch(error => {
                this.setState({ loading: false,signedIn:false,error:true })
            })
    }
    render() {
        console.log(this.state.signedIn)
        console.log("Loading Status", this.state.loading)


        let elementIdentifies = [];
        for (let key in this.state.authForm) {
            elementIdentifies.push({
                id: key,
                config: this.state.authForm[key]
            })
        }
        let authForm = elementIdentifies.map(e => {
            return <Input
                key={e.id}
                elementType={e.config.elementType}
                elementConfig={e.config.elementConfig}
                value={e.config.value}
                invalid={!e.config.valid}
                shouldValidate={e.config.validation}
                touched={e.config.touched}
                onChanged={event => this.inputHandler(event, e.id)}
            />
        })
        let fullAuthForm = null
        if (this.state.loading) {
            fullAuthForm = <Spinner />
        }
        else {
            if (this.state.signedIn) {
                fullAuthForm = <Customers logout={this.logoutHandler} />

            }
            else {
                fullAuthForm = (
                    <div className={classes.AuthForm}>
                        <h1>{this.state.isSignUp ? 'Sign Up Form' : 'Sign In Form'}<p>{this.state.error?"Error Detected":""}</p></h1>
                        <form onSubmit={this.submitHandler}>
                            {authForm}
                            <Button btnType="Success">Submit</Button>
                        </form>
                        <Button btnType="Danger" clicked={this.onAuthModeChanged}>Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>
                    </div>
                )
            }
        }

        return (
            <div>
                {fullAuthForm}
            </div>
        )
    }
}
export default Auth