import { gql } from "@apollo/client";

export const GetCustomers = gql`
query GetCustomers {
    customers {
      id
      name
      email
      role
      city_id
    }
  }
`;

export const GetCities = gql`
query GetCustomers {
  cities {
    name
  }
}
`;

export const AddCustomer = gql`
mutation AddCustomers($Customer: customers_insert_input!) {
  insert_customers(objects:[$Customer]){
    returning{
      city_id
      name
      email
    }
  }
} 
`;

export const EditCustomer = gql`
mutation EditCustomer ($Id: Int!,$Customer:customers_set_input!) {
  update_customers_by_pk
  (pk_columns: {id: $Id}, _set: $Customer) 
  {
    city_id
    email
    name
    role
  }
}
`;

export const DeleteCustomer = gql`
mutation DeleteCustomer($Id: Int!) {
  delete_customers_by_pk(id: $Id) {
    name
  }
}
`;

export const GetCustomerById = gql`
query MyQuery($Id:Int!) {
  customers_by_pk(id: $Id) {
    city_id
    email
    name
    role
  }
}
`;