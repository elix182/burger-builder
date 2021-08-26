import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import Button from '../../UI/Button/Button';

function OrderSummary(props){
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}: {props.ingredients[igKey]}
                </span>
            </li>
        ));
    return (
        <Wrapper>
            <h3>Your order</h3>
            <p>Here is your beautiful burger: </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Total: <strong>${props.price.toFixed(2)}</strong></p>
            <Button btnType='Danger' clicked={props.canceled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchased}>Checkout</Button>
        </Wrapper>
    )
}

OrderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
    canceled: PropTypes.func,
    purchased: PropTypes.func
}

export default OrderSummary;