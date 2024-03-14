import { Component } from "react";
import CustomersTable from "../Components/CustomersTable/CustomersTable";
import { useQuery } from "@apollo/client";
import { GetCities, GetCustomers } from "../graphql/queries";
import { useState } from "react";

import Spinner from "../UI/Spinner/Spinner";
import Button from '../UI/Button/Button'
import Modal from "../UI/Modal/Modal";
import NewRecord from "../Components/CustomersTable/NewRecord/NewRecord";
const Customers = () => {

    const addnewRecord = () => {
        console.log('Add new record')
    }
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
        newCustomers: [],
        h: "u"
    });
    // setState({...state,customers:data.customers})
    let customers = <Spinner />
    console.log(data)
    if (!loading && !error) {
        if (!cities.loading && !cities.error) {
            console.log(cities.data)
            const citiesmapped = cities.data.cities.map(city => {
                return { value: city.name, displayValue: city.name }
            })
            return (
                customers = (
                    <div>
                        <h1>Customers Table</h1>
                        <Modal show={true}  >
                            <NewRecord cities={citiesmapped} />
                        </Modal>
                        <CustomersTable customers={data.customers} />
                        <Button clicked={addnewRecord}>Add New Record</Button>
                    </div>

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