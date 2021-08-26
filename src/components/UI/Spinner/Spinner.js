import React from 'react';
import classes from './Spinner.module.css';

function Spinner(props){
    return props.show? <div className={classes.Loader}>Loading...</div> : null;
    
}

export default Spinner;