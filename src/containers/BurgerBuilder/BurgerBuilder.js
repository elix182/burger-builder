import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import * as actionsCreator from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { Redirect } from 'react-router';

function BurgerBuilder(props){
    const [purchasing, setPurchasing] = useState(false);

    useEffect(props.getIngredients, []);

    function updatePurchasableState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);
        return (sum > 0);
    }

    function purchaseBurgerHandler(){
        props.onCheckout();
        props.history.push('/checkout');
    }

    function purchaseHandler(){
        setPurchasing(true);
    }

    function cancelPurchaseHandler(){
        setPurchasing(false);
    }

    const disabledInfo = {
        ...props.ingredients
    }
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burgerBuilderJSX = props.error? <div>Can't load ingredients!</div> : <Spinner show />;
    if(props.loaded && !props.error){
        burgerBuilderJSX = (
            <Wrapper>
                <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
                    <OrderSummary 
                        ingredients={props.ingredients}
                        price={props.price}
                        purchased={purchaseBurgerHandler}
                        canceled={cancelPurchaseHandler} />
                </Modal>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    price={props.price}
                    purchasable={updatePurchasableState(props.ingredients)}
                    ingredientAdded={props.onAddIngredient} 
                    ingredientRemoved={props.onRemoveIngredient}
                    disabled={disabledInfo}
                    ordered={purchaseHandler} />
            </Wrapper>
        );
    }

    if(!props.loggedIn){
        burgerBuilderJSX = <Redirect to='/' />
    }

    return burgerBuilderJSX;
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        loaded: state.burgerBuilder.loaded,
        loggedIn: state.auth.loggedIn
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (type) => dispatch(actionsCreator.addIngredient(type)),
        onRemoveIngredient: (type) => dispatch(actionsCreator.removeIngredient(type)),
        getIngredients: () => dispatch(actionsCreator.getIngredients()),
        onCheckout: () => dispatch(actionsCreator.checkout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));