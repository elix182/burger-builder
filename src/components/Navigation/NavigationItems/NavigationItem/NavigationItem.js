import React from 'react';
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import classes from './NavigationItem.module.css';

function NavigationItem(props){
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={props.url} exact={props.exact} activeClassName={classes.active}>{props.label}</NavLink>
        </li>
    );
}

NavigationItem.propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool
};

export default NavigationItem;