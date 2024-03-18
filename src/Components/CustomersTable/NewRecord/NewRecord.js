import { useEffect, useState } from "react";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import { AddCustomer, EditCustomer, GetCustomers } from "../../../graphql/queries";
import { useMutation } from "@apollo/client";
const NewRecord = (props) => {

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
    useEffect(() => {

        let record = recordForm.orderForm
        record.name.value = props.customer_to_edit.name
        record.email.value = props.customer_to_edit.email
        record.role.value = props.customer_to_edit.role
        record.cities.value = props.displayCity

        setRecordForm({ ...recordForm, orderForm: record })

    }, [props.customer_to_edit]);

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

    let form = null;
    if (props.loading || props.updateLoading) {
        form = <Spinner/>
    }
    else{
        if (props.editMode) {
            form = (
                <form onSubmit={(e)=>props.updateCustomerFu(e,recordForm)}>
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
            form = (

                <form onSubmit={(e)=>props.addCustomerFu(e,recordForm)}>
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
    }
    return (
        <div>
            {form}
        </div>
    )
}
export default NewRecord;