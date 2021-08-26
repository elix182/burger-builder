import axios from 'axios';
import moment from 'moment';
import * as actionTypes from './actionTypes';
const FIREBASE_API_KEY = 'AIzaSyDrxIQQmaIFBoRrdGmsVdyr34ObMGqBvqA';

function auths(){
    return {
        type: actionTypes.AUTH
    }
}

function authSuccess(payload){
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {...payload}
    }
}

function authFailed(error){
    return {
        type: actionTypes.AUTH_FAILED,
        payload: {error: error}
    }
}

function logouts(){
    
    return {
        type: actionTypes.LOGOUT
    }
}

function logoutSuccess(){
    return {
        type: actionTypes.LOGOUT_SUCCESS,
    }
}

function logoutFailed(){
    return {
        type: actionTypes.LOGOUT_FAILED
    }
}

export function auth(user, pass, isSignUp = false){
    return dispatch => {
        dispatch(auths());
        const request = {
            email: user,
            password: pass,
            returnSecureToken: true
        };
        let url = '';
        if(isSignUp){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
        }
        axios.post(url, request)
        .then(response => {
            if(response.status >= 200 && response.status < 300){
                const payload = response.data;
                const token = payload.idToken;
                const refreshToken = payload.refreshToken;
                const userId = payload.localId;
                const timeout = payload.expiresIn * 1000;
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('expiresIn', moment().add(timeout, 'ms').format());
                localStorage.setItem('userId', userId);
                dispatch(authSuccess(payload));
                dispatch(logoutTimeout(timeout));
            } else {
                dispatch(authFailed());
            }
        }).catch(error => {
            dispatch(authFailed(error));
        });
    }
}

export function refresh(){
    return dispatch => {
        dispatch(auths());
        const request = {
            grant_type: 'refresh_token',
            refresh_token: localStorage.getItem('refreshToken')
        };
        let url = `https://identitytoolkit.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`;
        axios.post(url, request)
        .then(response => {
            if(response.status >= 200 && response.status < 300){
                const data = response.data;
                const token = data.id_token;
                const refreshToken = data.refresh_token;
                const expiresIn = data.expires_in;
                const userId = data.user_id;
                const timeout = expiresIn * 1000;
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('expiresIn', moment().add(timeout, 'ms').format());
                localStorage.setItem('userId', userId);
                const payload = {
                    idToken: token,
                    refreshToken,
                    expiresIn,
                    userId
                }
                dispatch(authSuccess(payload));
                dispatch(logoutTimeout(timeout));
            } else {
                dispatch(authFailed());
            }
        }).catch(error => {
            dispatch(authFailed(error));
        });
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    return logoutSuccess()
};

export function checkAuthState(){
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = moment(localStorage.getItem('expiresIn'));
            const now = moment();
            if(expirationDate <= now){
                dispatch(refresh());
            } else {
                const refreshToken = localStorage.getItem('refreshToken');
                const expiresIn = expirationDate.diff(now, 's');
                const userId = localStorage.getItem('userId');
                const timeout = expiresIn * 1000;
                const payload = {
                    idToken: token,
                    refreshToken,
                    expiresIn,
                    localId: userId
                }
                dispatch(authSuccess(payload));
                dispatch(logoutTimeout(timeout));
            }
        }
    }
}

function logoutTimeout(timeout){
    return dispatch => {
        setTimeout(() => {
            checkAuthState(dispatch);
        }, timeout);
    }
}