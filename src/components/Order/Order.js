import React from 'react';
import classes from './Order.module.css'

function Order(props){
    return (
        <div className={classes.Order}>
            <p>
                Ingredients: 
                {Object.keys(props.ingredients).map(igKey => {
                    if(props.ingredients[igKey] > 0){
                        return (
                            <span key={igKey} 
                            className={classes.Ingredient}>
                                {igKey} ({props.ingredients[igKey]})
                            </span>
                        );
                    }
                })}
            </p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;