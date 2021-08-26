import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    error: false,
    loaded: false,
    purchasing: false,
    orderPurchased: false
};

const reducer = (prevState = initialState, action) => {
    const state = {...prevState};
    switch(action.type){
        case actionTypes.PURCHASE_BURGER: {
            state.purchasing = true;
            state.error = false;
            state.loaded = false;
            break;
        }
        case actionTypes.CHECKOUT: {
            state.orderPurchased = false;
            break;
        }
        case actionTypes.CHECKOUT_CANCELED: {
            state.orderPurchased = false;
            break;
        }
        case actionTypes.GET_ORDERS: {
            state.error = false;
            state.loaded = false;
            break;
        }
        case actionTypes.GET_ORDERS_SUCCESS: {
            state.orders = [...action.payload.orders].reverse();
            state.error = false;
            state.loaded = true;
            break;
        }
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            const order = {...action.payload.order};
            const orders = state.orders.reverse().concat(order);
            state.orders = orders.reverse();
            state.error = false;
            state.loaded = true;
            state.orderPurchased = true;
            state.purchasing = false;
            break;
        }
        case actionTypes.GET_ORDERS_FAILED: {
            state.error = true;
            state.loaded = true;
            break;
        }
        case actionTypes.PURCHASE_BURGER_FAILED: {
            state.error = true;
            state.loaded = true;
            state.orderPurchased = false;
            state.purchasing = false;
            break;
        }
        default: break;
    }
    return state;
}

export default reducer;