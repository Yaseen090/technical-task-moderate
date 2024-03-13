import classes from './Modal.css'
import Aux from '../../../hoc/Auxillary'
import Backdrop from '../Backdrop/Backdrop'
const modal = (props) => {
    let arr = [classes.Modal]
    if (props.show) {
        arr = [classes.Modal, classes.Closed]
    }
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={arr.join(' ')}>
                {props.children}
            </div>
        </Aux>
    )
}
export default modal;