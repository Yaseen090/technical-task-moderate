import { Component } from "react";
import CustomersTable from "../Components/CustomersTable/CustomersTable";
import { useQuery } from "@apollo/client";
import { EditCustomer, GetCities, GetCustomerById, GetCustomers } from "../graphql/queries";
import { useState, useEffect, useReducer } from "react";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Spinner from "../UI/Spinner/Spinner";
import Button from '../UI/Button/Button'
import Modal from "../UI/Modal/Modal";
import NewRecord from "../Components/CustomersTable/NewRecord/NewRecord";
import { useMutation } from "@apollo/client";
import { DeleteCustomer } from "../graphql/queries";
import DeleteModal from "../Components/DeleteModal/DeleteModal";



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
                city_id: 1


            }
        ],
        customer_to_edit: {
            id: 1,
            name: '',
            email: "",
            role: "",
            city_id: 1
        },
        editMode: false,
        updateId: 0,
        currentUpdateId: 0,
        deleteId: 0,
        show: false,
        deleteShow: false,
        deleteTouched: false

    });

    const [deleteFunction, { loading: deleteLoading }] = useMutation(DeleteCustomer, {
        variables: {
            Id: state.deleteId
        },
        refetchQueries: [
            { query: GetCustomers }
        ]
    });

    useEffect(() => {
        if (!loading && !error) {
            setState(state => ({ ...state, customers: data.customers }))
        }
    }, [data]);



    useEffect(() => {
        deleteFunction();
    }, [state.deleteTouched]);


    const addnewRecord = () => {
        setState({ ...state, show: true })
    }
    const closeHandler = () => {
        setState({
            ...state, show: false, customer_to_edit: {
                id: 1,
                name: '',
                email: "",
                role: "",
                city_id: 1
            }, editMode: false
        })
    }
    const EditHandler = (id) => {
        const customer_to_edit = state.customers.find((e) => e.id == id)
        setState({ ...state, show: true, editMode: true, customer_to_edit: customer_to_edit })

    }
    const deleteHandler = (id) => {
        setState({ ...state, deleteId: id, deleteShow: true })

    }

    const deleteCloseHandler = () => {
        setState({ ...state, deleteShow: false })
    }
    const deleteTouched = () => {
        const deleteTouched = state.deleteTouched
        setState({ ...state, deleteTouched: !deleteTouched })
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
                    displayValue = cities.data.cities[(state.customer_to_edit.city_id - 1)].name

                }

            }

            return (
                customers = (
                    <Flex align={"center"} bg="gray.200" justify="center" w={"100vw"} h="100vh">
                        <Modal show={state.show} clicked={closeHandler} >
                            <NewRecord citiesRaw={cities.data.cities} cities={citiesmapped} displayCity={displayValue} customer_to_edit={state.customer_to_edit} editMode={state.editMode} />
                        </Modal>
                        <Modal show={state.deleteShow} clicked={deleteCloseHandler} >
                            {deleteLoading ? <Spinner /> : <DeleteModal deleteClicked={deleteTouched} deleteCanceled={deleteCloseHandler} />}
                        </Modal>
                        <Stack p="5%" bg="gray.300" w={"90vw"} h={"90vh"} rounded={"10px"} align={"center"} >
                            <Heading>Customers Table</Heading>
                            <br />
                            <CustomersTable cities={cities.data.cities} customers={state.customers} edit={EditHandler} delete={deleteHandler} />
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