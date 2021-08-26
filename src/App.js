import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Wrapper from './hoc/Wrapper/Wrapper';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

function App(props) {

  useEffect(() => {
    props.tryAutologin();
  }, []);

  function redirectJSX(){
    return props.loggedIn? <Redirect to='/burgerbuilder' /> : <Redirect to='/auth' />;
  }

  let routes = [];
  if(props.loggedIn){
    routes = [
      <Route path='/' exact component={redirectJSX} />,
      <Route path='/burgerbuilder' exact component={BurgerBuilder} />,
      <Route path='/checkout' component={Checkout} />,
      <Route path='/orders' component={Orders} />,
      <Route path='/logout' exact component={Logout} />
    ];
  } else {
    routes = [
      <Route path='/' exact component={redirectJSX} />,
      <Route path='/auth' exact component={Auth} />
    ];
  }

  return (
    <Wrapper className='App'>
      <Layout>
        <Switch>
          {routes.map((routeJSX, index) => React.cloneElement(routeJSX,{key: index}))}
          <Redirect to='/' />
        </Switch>
      </Layout>
    </Wrapper>
  );
}

function mapStateToProps(state){
  return {
    loggedIn: state.auth.loggedIn
  }
}

function mapDispatchToProps(dispatch){
  return {
    tryAutologin: () => dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
