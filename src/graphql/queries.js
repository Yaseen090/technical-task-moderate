import { gql, useMutation } from "@apollo/client";

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
