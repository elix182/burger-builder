import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

function getOrderss(){
    return {
        type: actionTypes.GET_ORDERS,
    };
}

function getOrdersSuccess(orders){
    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        payload: { orders: orders }
    };
}

function getOrdersFailed(){
    return {
        type: actionTypes.GET_ORDERS_FAILED,
    };
}

export function checkout(){
    return {
        type: actionTypes.CHECKOUT,
    };
}

export function cancelCheckout(){
    return {
        type: actionTypes.CHECKOUT_CANCELED,
    };
}

function purchasesBurger(){
    return {
        type: actionTypes.PURCHASE_BURGER
    }
}

function purchaseBurgerSuccess(order){
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: { order: order }
    };
}

function purchaseBurgerFailed(){
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
    };
}

export function getOrders(token, userId = null){
    return dispatch => {
        dispatch(getOrderss());
        let extraQueryParams = '';
        if(userId){
            extraQueryParams += `&orderBy="userId"&equalsTo="${userId}"`;
        }
        axios.get(`/orders.json?auth=${token}${extraQueryParams}`)
        .then(response => {
            if(response.status >= 200 && response.status < 300){
                const data = response.data;
                const orders = Object.keys(data).map(igKey => {
                    return {
                        id: igKey,
                        ...data[igKey]
                    }
                });
                dispatch(getOrdersSuccess(orders));
            } else {
                dispatch(getOrdersFailed());
            }
        })
        .catch(error => {
            dispatch(getOrdersFailed());
        });
    }
}

export function purchaseBurger(token, request){
    return dispatch => {
        dispatch(purchasesBurger());
        axios.post(`/orders.json?auth=${token}`, request)
        .then(response => {
            if(response.status >= 200 < response.status < 300){
                const id = response.data;
                const order = {
                    ...request,
                    id: id
                }
                dispatch(purchaseBurgerSuccess(order));
            } else {
                dispatch(purchaseBurgerFailed());
            }
        })
        .catch(error => {
            dispatch(purchaseBurgerFailed());
        });
    }
}