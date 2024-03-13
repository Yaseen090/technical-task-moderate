import { Component } from "react";
import CustomersTable from "../Components/CustomersTable/CustomersTable";
import { useQuery } from "@apollo/client";
import { GetCustomers } from "../graphql/queries";
import { useState } from "react";

import Spinner from "../UI/Spinner/Spinner";
import Button from '../UI/Button/Button'
const Customers = () => {


    const { loading, error, data } = useQuery(GetCustomers);

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
    let customers = <Spinner/>
    console.log(data)
    if (!loading && !error) {
        return (
            customers = (
                <div>
                    <h1>Customers Table</h1>
                    <CustomersTable customers={data.customers} />
                    <Button>Add New Record</Button>
                </div>

            )

        )
    }

    return (

        <div>
            {customers}
        </div>
    )

}

export default Customers;