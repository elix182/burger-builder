import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionsCreator from '../../store/actions/index';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI//Spinner/Spinner';
import classes from './Orders.module.css'
import { Redirect } from 'react-router';

function Orders(props){

    useEffect(() => props.getOrders(props.accessToken, props.userId), []);

    let ordersJSX = props.error? <div>Can't load orders!</div> : <Spinner show />
    if(props.loaded && !props.error){
        ordersJSX = (
            <div className={classes.Orders}>
                {props.orders?.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} customer={order.customer}/>)}
            </div>
        );
    }

    if(!props.loggedIn){
        ordersJSX = <Redirect to='/' />
    }

    return ordersJSX;
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        error: state.orders.error,
        loaded: state.orders.loaded,
        accessToken: state.auth.token,
        loggedIn: state.auth.loggedIn,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token, userId) => dispatch(actionsCreator.getOrders(token, userId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders));