import {
    Tr,
    Td,
} from '@chakra-ui/react'
import Button from '../../../UI/Button/Button';
const customerRow = (props) => {
    return (
        <Tr>
            <Td>{props.id}</Td>
            <Td>{props.name}</Td>
            <Td >{props.email}</Td>
            <Td >{props.role}</Td>
            <Td >{props.city}</Td>
            <Td ><div>
                <Button btnType='Success' clicked={props.editClicked}>Edit</Button>
                <Button btnType="Danger"  clicked={props.deleteClicked}>Delete</Button>

                </div></Td>

        </Tr>
    )
}
export default customerRow;