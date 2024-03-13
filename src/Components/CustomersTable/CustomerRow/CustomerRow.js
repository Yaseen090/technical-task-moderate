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

const customerRow = (props) => {
    return (
        <Tr>
            <Td>{props.id}</Td>
            <Td>{props.name}</Td>
            <Td >{props.email}</Td>
            <Td >{props.role}</Td>
            <Td >{props.city}</Td>

        </Tr>
    )
}
export default customerRow;