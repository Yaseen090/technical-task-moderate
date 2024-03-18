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

    let customerslist = [...props.customers]
    customerslist.sort((a,b)=>a.id>b.id?1:-1)
    const customers = customerslist.map(e => {
        return <CustomerRow
            key={e.id}
            id={e.id}
            name={e.name}
            email={e.email}
            role={e.role}
            city={props.cities[(e.city_id-1)].name}
            editClicked={()=>props.edit(e.id)}
            deleteClicked={()=>props.delete(e.id)}

        />
    })
    return (
        <TableContainer overflowY={'scroll'}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th >ID</Th>
                        <Th>Customers Name</Th>
                        <Th> Email</Th>
                        <Th> Role</Th>
                        <Th> City</Th>
                        <Th> Edit/Delete</Th>

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