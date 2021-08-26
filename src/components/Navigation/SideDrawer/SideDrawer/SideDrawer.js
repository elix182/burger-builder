import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../../NavigationItems/NavigationItems';
import Wrapper from '../../../../hoc/Wrapper/Wrapper';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

function SideDrawer(props){
    const classNames = [classes.SideDrawer];
    if(props.open){
        classNames.push(classes.Open);
    } else {
        classNames.push(classes.Close)
    }
    const className = classNames.join(' ');
    return (
        <Wrapper>
            <Backdrop show={props.open ?? false} clicked={props.closed}/>
            <div className={className}>
                <div style={{height: '11%', marginBottom: '16pt'}}><Logo /></div>
                <nav>
                    <NavigationItems loggedIn={props.loggedIn} />
                </nav>
            </div>
        </Wrapper>
    );
}

SideDrawer.propTypes = {
    open: PropTypes.bool,
    closed: PropTypes.func
}

export default SideDrawer;