import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

function NavigationItems(props){
    let navigationItemAuth = props.loggedIn? <NavigationItem url='/logout' exact label='Logout'/> : <NavigationItem url='/auth' exact label='Login'/>;
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem url='/burgerbuilder' exact label='Burger Builder' active/>
            {props.loggedIn? <NavigationItem url='/orders' exact label='Orders'/> : null }
            {navigationItemAuth}
        </ul>
    );
}

export default NavigationItems;