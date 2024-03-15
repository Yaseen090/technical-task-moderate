import { Component } from "react";
import CustomersTable from "../Components/CustomersTable/CustomersTable";
import { useQuery } from "@apollo/client";
import { EditCustomer, GetCities, GetCustomerById, GetCustomers } from "../graphql/queries";
import { useState, useEffect } from "react";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Spinner from "../UI/Spinner/Spinner";
import Button from '../UI/Button/Button'
import Modal from "../UI/Modal/Modal";
import NewRecord from "../Components/CustomersTable/NewRecord/NewRecord";
import { useMutation } from "@apollo/client";
import { DeleteCustomer } from "../graphql/queries";
const Customers = () => {


    const { loading, error, data } = useQuery(GetCustomers);
    const cities = useQuery(GetCities)

    const [state, setState] = useState({
        customers: [
            {
                id: 1,
                name: 'Abhinav',
                email: "yaseenburiro090@gmail.com",
                role: "VIP",
                city: 1


            }
        ],
        customer_to_edit: {
            id: 1,
            name: '',
            email: "",
            role: "",
            city: 1
        },
        editMode: false,
        updateId: 0,
        currentUpdateId: 0,
        deleteId: 0,
        show: false,

    });


    const [deleteFunction] = useMutation(DeleteCustomer, {
        variables: {
            Id: state.deleteId
        }
    });

    useEffect(() => {
        if (!loading && !error) {
            setState(state => ({ ...state, customers: data.customers }))
        }
    }, [data]);

  

    useEffect(() => {
        deleteFunction();
    }, [state.deleteId]);


    const addnewRecord = () => {
        setState({ ...state, show: true })
    }
    const closeHandler = () => {
        setState({ ...state, show: false,customer_to_edit:{
            id: 1,
            name: '',
            email: "",
            role: "",
            city_id: 1
        }, editMode: false })
    }
    const EditHandler = (id) => {
        const customer_to_edit = state.customers.find((e) => e.id == id)
        setState({ ...state, show: true, editMode: true, customer_to_edit: customer_to_edit })

    }
    const deleteHandler = (id) => {
        setState({ ...state, deleteId: id })

    }
    let customers = <Spinner />
    if (!loading && !error) {
        if (!cities.loading && !cities.error) {
            const citiesmapped = cities.data.cities.map(city => {
                return { value: city.name, displayValue: city.name }
            })
            let displayValue = ''
            if (state.customer_to_edit) {
                if (cities.data.cities[(state.customer_to_edit.city_id - 1)]) {
                displayValue=cities.data.cities[(state.customer_to_edit.city_id-1)].name

                }

            }

            return (
                customers = (
                    <Flex align={"center"} bg="gray.200" justify="center" w={"100vw"} h="100vh">
                        <Modal show={state.show} clicked={closeHandler} >
                            <NewRecord citiesRaw ={cities.data.cities} cities={citiesmapped} displayCity={displayValue} customer_to_edit={state.customer_to_edit} editMode={state.editMode} />
                        </Modal>
                        <Stack p="5%" bg="gray.300" w={"90vw"} h={"90vh"} rounded={"10px"} align={"center"} >
                            <Heading>Customers Table</Heading>
                            <br />
                            <CustomersTable customers={state.customers} edit={EditHandler} delete={deleteHandler} />
                            <Button btnType="Success" clicked={addnewRecord}>Add New Record</Button>

                        </Stack>
                    </Flex>


                )

            )
        }
    }

    return (

        <div>
            {customers}
        </div>
    )

}

export default Customers;