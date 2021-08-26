import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../store/actions/index';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

function Checkout(props){
    function continueHandler(){
        props.history.push('/checkout/contactdata');
    }

    function canceledHandler(){
        props.cancelCheckout();
        props.history.goBack();
    }

    function checkIngredients(){
        let valid = false;
        if(props.ingredients){
            for(let igKey in props.ingredients){
                const value = parseInt(props.ingredients[igKey]);
                if(value !== 0){
                    valid = true;
                }
            }
        }
        return valid;
    }

    let checkoutJSX = props.orderPurchased || !checkIngredients()? <Redirect to='/' /> : (
        <div>
            <CheckoutSummary ingredients={props.ingredients} continue={continueHandler} canceled={canceledHandler} />
            <Route
                path={`${props.match.url}/contactdata`} exact
                render={() => <ContactData ingredients={props.ingredients} price={props.price} {...props} />}
                />
            
        </div>
    )
    return checkoutJSX;
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loaded: state.orders.loaded,
        error: state.orders.error,
        orderPurchased: state.orders.orderPurchased,
        purchasing: state.orders.purchasing,
        accessToken: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (token, request) => dispatch(actions.purchaseBurger(token, request)),
        cancelCheckout: () => dispatch(actions.cancelCheckout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);