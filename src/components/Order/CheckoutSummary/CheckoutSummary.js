import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

function CheckoutSummary(props){
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Nice burger</h1>
            <div style={{width: '300pt', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.canceled}>Cancel</Button>
            <Button btnType='Success' clicked={props.continue}>Continue</Button>
        </div>
    );
}

export default CheckoutSummary;