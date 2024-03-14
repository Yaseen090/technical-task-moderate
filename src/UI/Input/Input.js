import classes from './Input.css'
const input = (props) => {
    let validClasses = [classes.InputElement]
    if (props.invalid && props.shouldValidate && props.touched) {
        validClasses.push(classes.Invalid)
    }
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={validClasses.join(' ')}
                type={props.elementType}
                {...props.elementConfig}
                onChange={props.onChanged}
                value={props.value}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={validClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChanged} />
            break;
        case ('select'):
            inputElement = (<select
            onChange={props.onChanged}
            value={props.value}
                className={validClasses.join(' ')}>
                {props.elementConfig.options.map(option=>{
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>);
            break;
        default:
            inputElement = <input {...props} />

    }
    return (
        <div className={classes.Input}>
            {inputElement}
        </div>)
}
export default input;