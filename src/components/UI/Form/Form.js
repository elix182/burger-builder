import React, {useState} from 'react';
// import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../Button/Button';
import Input from '../Input/Input';

function Form(props){
    const [formFields, setFormFields] = useState({...props.fields});

    function checkValue(value, rules){
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minLength){
                isValid = value.trim().length >= rules.minLength && isValid;
            }
            if(rules.maxLength){
                isValid = value.trim().length <= rules.maxLength && isValid;
            }
            if(rules.length){
                isValid = value.trim().length === rules.length && isValid;
            }
        }
        return isValid;
    }

    function isFormValid(){
        for(let key in formFields){
            if(!formFields[key].valid){
                return false;
            }
        }
        return true;
    }

    function formChangedHandler(key, value){
        const updatedForm = {...formFields};
        updatedForm[key].value = value;
        updatedForm[key].valid = checkValue(value, updatedForm[key].validation);
        if(!updatedForm[key].valid){
            updatedForm[key].error = 'Please enter a valid value.'
        }
        updatedForm[key].touched = true;
        setFormFields(updatedForm);
    }

    function onSubmitForm(event){
        event.preventDefault(); 
        //Prepare the form data
        const formData = {};
        for(let key in formFields){
            formData[key] = formFields[key].value
        }
        //Send the data to the current callback
        props.submit(formData);
    }

    let contentJSX = (
        <form onSubmit={onSubmitForm}>
            {props.children}
            {Object.keys(formFields).map(igKey => {
                let field = formFields[igKey];
                return <Input key={igKey} 
                    inputtype={field.elementType} 
                    config={field.elementConfig} 
                    value={field.value}
                    changed={event => formChangedHandler(igKey, event.target.value)}
                    invalid={!field.valid && field.validation}
                    touched={field.touched}
                    error={field.error} />
            })}
            <Button btnType='Success' disabled={!isFormValid()}>{props.submitLabel}</Button>
        </form>
    );

    return contentJSX;
}

export default Form;