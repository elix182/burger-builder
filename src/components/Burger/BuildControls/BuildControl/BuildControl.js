import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.module.css'

function BuildControl(props){
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button 
                className={classes.Less}
                onClick={() => props.removed(props.type)}
                disabled={props.disabled}
            >
                &minus;
            </button>
            <button 
                className={classes.More}
                onClick={() => props.added(props.type)}
            >
                &#x2B;
            </button>
        </div>
    );
}

BuildControl.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    added: PropTypes.func,
    removed: PropTypes.func,
    disabled: PropTypes.bool
}

export default BuildControl;