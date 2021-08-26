import React from 'react';
import classes from './Card.module.css';

export default props => {
    return <div className={classes.Card}>{props.children}</div>
}