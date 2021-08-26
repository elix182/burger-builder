import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loggedIn: localStorage.getItem('token') != null,
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    error: false,
    loading: false,
};

const reducer = (prevState = initialState, action) => {
    const state = {...prevState};
    switch(action.type){
        case actionTypes.AUTH: {
            state.error = false;
            state.loading = true;
            state.userId = null;
            state.token = null;
            state.refreshToken = null;
            state.loggedIn = false;
            break;
        }
        case actionTypes.AUTH_SUCCESS: {
            state.error = false;
            state.loading = false;
            state.userId = action.payload.localId;
            state.token = action.payload.idToken;
            state.refreshToken = action.payload.refreshToken;
            state.loggedIn = true;
            break;
        }
        case actionTypes.AUTH_FAILED: {
            state.error = action.payload.error.message;
            state.loading = false;
            break;
        }
        case actionTypes.LOGOUT: {
            state.error = false;
            state.loading = true;
            break;
        }
        case actionTypes.LOGOUT_SUCCESS: {
            state.error = false;
            state.loading = false;
            state.userId = null;
            state.token = null;
            state.refreshToken = null;
            state.loggedIn = false;
            break;
        }
        case actionTypes.LOGOUT_FAILED: {
            state.error = true;
            state.loading = false;
            break;
        }
        default: break;
    }
    return state;
}

export default reducer;