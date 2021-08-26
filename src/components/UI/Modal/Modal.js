import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css'

function Modal(props){
    return (
        <Wrapper>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div 
                className={classes.Modal}
                style = {{
                    transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Wrapper>
    );
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    modalClosed: PropTypes.func
}

export default Modal;