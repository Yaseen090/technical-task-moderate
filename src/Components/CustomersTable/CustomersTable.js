import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

import CustomerRow from './CustomerRow/CustomerRow';
const customersTable = (props) => {
    const customers = props.customers.map(e => {
        return <CustomerRow
            key={e.id}
            id={e.id}
            name={e.name}
            email={e.email}
            role={e.role}
            city={e.city_id}
        />
    })
    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th >ID</Th>
                        <Th>Customers Name</Th>
                        <Th> Email</Th>
                        <Th> Role</Th>
                        <Th> City</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {customers}
                </Tbody>

            </Table>
        </TableContainer>
    )
}
export default customersTable;