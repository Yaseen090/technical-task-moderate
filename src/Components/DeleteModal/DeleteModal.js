import Button from "../../UI/Button/Button"
const deleteModal =(props)=>{
    return(
        <div>
            <h1>Are you sure you want to delete??</h1>
            <Button btnType="Danger" clicked={props.deleteClicked}>Delete</Button>
            <Button btnType="Success" clicked={props.deleteCanceled}>Cancel</Button>

        </div>
    )
}
export default deleteModal;