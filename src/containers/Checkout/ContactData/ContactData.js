import React, {useState} from 'react';
import moment from 'moment';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Form from '../../../components/UI/Form/Form'

function ContactData(props){
    const formFields = {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Name',
                placeholder: 'Your name',
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                minLength: 5
            },
            touched: false,
            error: ''
        },
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
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Street',
                placeholder: 'Street name',
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                minLength: 5
            },
            touched: false,
            error: ''
        },
        postalCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'ZIP Code',
                placeholder: 'ZIP Code',
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                length: 5
            },
            touched: false,
            error: ''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'},
                ],
                label: 'Delivery method',
            },
            value: 'fastest',
            touched: false,
            valid: true
        },
    };

    function orderHandler(form){
        const customer = {...form};
        const request = {
            ingredients: props.ingredients,
            price: props.price,
            customer: customer,
            date: moment().valueOf(),
            userId: props.userId
        };
        console.log(props.userId)
        props.purchaseBurger(props.accessToken, request)
    }

    let contentJSX = (
        <Form fields={formFields} submit={orderHandler} submitLabel='Order' />
    );

    if(!props.loaded && props.purchasing){
        contentJSX = <Spinner show />;
    }

    return (
        <div className={classes.ContactData}>
            <h4>Please enter your contact information</h4>
            {contentJSX}
        </div>
    );
}

export default withErrorHandler(ContactData);