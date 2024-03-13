import './Button.css'

const button = (props)=>{
    return <button onClick={props.clicked}
    className='Button'>{props.children}</button>
}
export default button;