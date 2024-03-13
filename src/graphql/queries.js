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

