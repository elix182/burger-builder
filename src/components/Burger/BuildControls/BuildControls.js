import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
];

function BuildControls(props){
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(control =>
                <BuildControl
                    key={control.type}
                    label={control.label} 
                    type={control.type} 
                    added={props.ingredientAdded} 
                    removed={props.ingredientRemoved}
                    disabled={props.disabled[control.type]} />
            )}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}
            >
                ORDER NOW
            </button>
        </div>
    );
}

BuildControls.propTypes = {
    price: PropTypes.number.isRequired,
    purchasable: PropTypes.bool.isRequired,
    ingredientAdded: PropTypes.func,
    ingredientRemove: PropTypes.func,
    disabled: PropTypes.object
}

export default BuildControls;