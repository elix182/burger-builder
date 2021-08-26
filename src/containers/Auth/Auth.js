import React, {useState} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import Card from '../../components/Card/Card';
import Button from '../../components/UI/Button/Button';
import Form from '../../components/UI/Form/Form';
import Spinner from '../../components/UI/Spinner/Spinner';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

function Auth(props) {
    const [signUpMode, setSignUpMode] = useState(false);
    const formData = {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                label: 'E-Mail',
                placeholder: 'Your E-Mail',
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                minLength: 5,
            },
            touched: false,
            error: ''
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                label: 'Password',
                placeholder: 'Your password',
            },
            value: '',
            valid: false,
            validation: {
                required: true,
            },
            touched: false,
            error: ''
        },
    };

    function onSubmitForm(formData){
        if(!signUpMode) {
            props.onLogIn(formData.email, formData.password);
        } else {
            props.onSignUp(formData.email, formData.password);
        }
    }

    function onToggleSignUpForm(){
        setSignUpMode(!signUpMode);
    }

    const submitLabel = signUpMode? 'Sign Up' : 'Login'
    const signUpModeLabel = signUpMode? 'Cancel' : 'Register';

    let contentJSX = props.loading? <Spinner show /> : (
        <Wrapper>
            <Form fields={formData} submit={onSubmitForm} submitLabel={submitLabel}>
                <h3>Please insert your credentials</h3>
                {props.error? <p style={{color: 'red'}}>{props.error}</p> : null}
            </Form>
            <Button btnType='Danger' clicked={onToggleSignUpForm}>{signUpModeLabel}</Button>
        </Wrapper>
    )

    let authJSX = (
        <Card>
            {contentJSX}
        </Card>
    );

    if(props.loggedIn){
        authJSX = <Redirect to='/burgerbuilder' />
    }

    return authJSX;
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (user, pass) => dispatch(actions.auth(user, pass)),
        onSignUp: (user, pass) => dispatch(actions.auth(user, pass, true)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));