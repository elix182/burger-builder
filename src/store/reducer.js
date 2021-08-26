import {combineReducers} from 'redux';

import burgerBuilderReducer from './reducers/burgerBuilder';
import ordersReducer from './reducers/orders';
import authReducer from './reducers/auth';

const reducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: ordersReducer,
    auth: authReducer
});

export default reducer;