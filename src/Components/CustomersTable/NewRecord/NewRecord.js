import { useEffect, useState } from "react";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import { AddCustomer, EditCustomer } from "../../../graphql/queries";
import { useMutation } from "@apollo/client";
const NewRecord = (props) => {

    console.log(props.customer_to_edit)
    const [recordForm, setRecordForm] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Customers Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            role: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Role'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            cities: {
                elementType: 'select',
                elementConfig: {
                    options: props.cities
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false

    })
    console.log("NewRecord", props.displayCity)
    useEffect(() => {
        if (!loading && !error) {
            let record = recordForm.orderForm
            record.name.value = props.customer_to_edit.name
            record.email.value = props.customer_to_edit.email
            record.role.value = props.customer_to_edit.role
            record.cities.value = props.displayCity

            setRecordForm({ ...recordForm, orderForm: record })
        }
    }, [props.customer_to_edit]);
    // if (props.editMode) {
    //     let record=recordForm.orderForm
    //     record.name.value=props.customer_to_edit.name
    //     setRecordForm({...recordForm,orderForm:record})
    // }
    // if(props.editMode){

    // }
    const [updateFunction,{updateData,updateLoading,updateError}] = useMutation(EditCustomer, {
        variables: {
            Id: props.customer_to_edit.id,
            Customer: {
                name: recordForm.orderForm.name.value,
                email: recordForm.orderForm.email.value,
                role: recordForm.orderForm.role.value,
                city_id: props.citiesRaw.findIndex((e) => e.name === recordForm.orderForm.cities.value) + 1
                // (props.citiesRaw.findIndex((e)=>{return e=props.displayCity})+1)

            }
        }
    });
    const [mutateFunction, { data, loading, error }] = useMutation(AddCustomer, {
        variables: {
            Customer: {
                name: recordForm.orderForm.name.value,
                email: recordForm.orderForm.email.value,
                role: recordForm.orderForm.role.value,
                city_id: props.citiesRaw.findIndex((e) => e.name === recordForm.orderForm.cities.value) + 1
                // (props.citiesRaw.findIndex((e)=>{return e=props.displayCity})+1)

            }
        }
    });
    // console.log("Number",props.citiesRaw.findIndex((e)=>e.name=="Newyork"))
    console.log("Number", props.citiesRaw.findIndex((e) => e.name === recordForm.orderForm.cities.value) + 1)
    console.log("Customer To Edit", props.customer_to_edit)
    const checkValidity = (value, rules) => {
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



    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...recordForm.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setRecordForm({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }
    const formElementsArray = [];
    for (let key in recordForm.orderForm) {
        formElementsArray.push({
            id: key,
            config: recordForm.orderForm[key]
        });
    }

    // const addCustomerFu=()=>{
    //     mutateFunction()
    // }
    const updateCustomerFu=()=>{
        updateFunction()
     }
    console.log(props.editMode)
    let form = null;
    if (props.editMode) {
        console.log("Edit Mode On")
        form = (
            <form onSubmit={updateCustomerFu}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        onChanged={(event) => inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success">Edit Customer</Button>
            </form>
        );
    }
    else {
        console.log("Edit Mode Off")

        form = (
            
            <form onSubmit={() => mutateFunction()}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        onChanged={(event) => inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success">Add New Customer</Button>
            </form>
        );

    }
    return (
        <div>
            {form}
        </div>
    )
}
export default NewRecord;