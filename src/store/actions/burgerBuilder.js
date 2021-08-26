import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export function addIngredient(type){
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: { type: type }
    };
}

export function removeIngredient(type){
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { type: type }
    };
}

function getIngredientsSuccess(data){
    return {
        type: actionTypes.GET_INGREDIENTS_SUCCESS,
        payload: { data: data },
    };
}

function getIngredientsFailed(){
    return {
        type: actionTypes.GET_INGREDIENTS_FAILED
    };
}

export function getIngredients(){
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            if(response.status >= 200 && response.status < 300){
                const data = response.data;
                dispatch(getIngredientsSuccess(data));
            } else {
                dispatch(getIngredientsFailed());
            }
        })
        .catch(error => {
            dispatch(getIngredientsFailed());
        })
    }
}