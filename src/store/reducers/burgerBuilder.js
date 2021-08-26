import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.5,
    cheese: 0.2,
    meat: 1.3
}
const BURGER_BASE_PRICE = 4.0;
const DEFAULT_INGREDIENTS = {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
};
const initialState = {
    ingredients: {...DEFAULT_INGREDIENTS},
    price: BURGER_BASE_PRICE,
    error: false,
    loaded: false
};

const reducer = (prevState = initialState, action) => {
    const state = {...prevState};
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: {
            const type = action.payload.type;
            const oldCount = state.ingredients[type];
            const updatedCount = oldCount + 1;
            const updatedIngredients = {...state.ingredients}
            updatedIngredients[type] = updatedCount;
            const updatedPrice = state.price + INGREDIENT_PRICES[type];
            state.ingredients = updatedIngredients;
            state.price = updatedPrice;
            break;
        }
        case actionTypes.REMOVE_INGREDIENT: {
            const type = action.payload.type;
            const oldCount = state.ingredients[type];
            if(oldCount > 0){
                const updatedCount = oldCount - 1;
                const updatedIngredients = {...state.ingredients}
                updatedIngredients[type] = updatedCount;
                const updatedPrice = state.price - INGREDIENT_PRICES[type];
                state.ingredients = updatedIngredients;
                state.price = updatedPrice;
            }
            break;
        }
        case actionTypes.GET_INGREDIENTS: {
            state.error = false;
            state.loaded = false;
            break;
        }
        case actionTypes.GET_INGREDIENTS_SUCCESS: {
            const data = action.payload.data;
            Object.keys(data).forEach(igKey => {
                DEFAULT_INGREDIENTS[igKey] = data[igKey];
            });
            const ingredientsPrice = Object.keys(data)
                .map(igKey => data[igKey] > 0 ? INGREDIENT_PRICES[igKey] : 0)
                .reduce((sum, el) => sum + el, 0);
            const price = BURGER_BASE_PRICE + ingredientsPrice;
            state.ingredients = {...DEFAULT_INGREDIENTS};
            state.price = price;
            state.error = false;
            state.loaded = true;
            break;
        }
        case actionTypes.GET_INGREDIENTS_FAILED: {
            state.error = true;
            state.loaded = true;
            break;
        }
        default: break;
    }
    return state;
}

export default reducer;