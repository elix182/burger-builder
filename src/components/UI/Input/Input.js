import React from 'react';
import classes from './Input.module.css';

function Input(props){
    let inputElement = null;
    const showError = props.error && props.invalid && props.touched? true : false;
    const classNames = [classes.InputElement]
    if(showError){
        classNames.push(classes.Invalid);
    }
    const classString = classNames.join(' ');
    switch(props.inputtype){
        case 'input':
        default:
            inputElement = <input className={classString} {...props.config} value={props.value} onChange={props.changed} />;
            break;
        case 'textArea':
            inputElement = <textarea className={classString} {...props.config} value={props.value} onChange={props.changed} />;
            break;
        case 'select':
            inputElement = <select className={classString} {...props.config} value={props.value} onChange={props.changed}>
                {props.config.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.config.label}</label>
            {inputElement}
            <span style={{display: showError? 'inline':'none'}} className={classes.Error}>{props.error}</span>
        </div>
    )
}

export default Input;