import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';

function Toolbar(props){
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.toggle} />
            <Logo />
            <nav className={classes.DesktopOnly}>
                <NavigationItems loggedIn={props.loggedIn} />
            </nav>
        </header>
    );
}

Toolbar.propTypes = {
    toggle: PropTypes.func
}

export default Toolbar;