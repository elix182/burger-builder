import React, {useState} from 'react';
import {connect} from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer/SideDrawer';
import classes from './Layout.module.css'

function Layout(props){
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    function sideDrawerClosedHandler(){
        setShowSideDrawer(false);
    }

    function sideDrawerOpenedHandler(){
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Wrapper>
            <Toolbar toggle={sideDrawerOpenedHandler} loggedIn={props.loggedIn}/>
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} loggedIn={props.loggedIn}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Wrapper>
    );
}

function mapStateToProps(state){
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Layout);
