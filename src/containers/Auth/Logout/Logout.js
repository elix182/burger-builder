import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

function Logout(props){
    useEffect(() => {
        props.logout();
    }, []);

    let logoutJSX = props.loggedIn? <Spinner show /> : <Redirect to='/' />
    return logoutJSX
}

function mapStateToProps(state){
    return {
        loggedIn: state.auth.loggedIn
    }
}

function mapDispatchToProps(dispatch){
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);