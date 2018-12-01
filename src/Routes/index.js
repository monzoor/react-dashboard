import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import createHistory from 'history/createBrowserHistory';
import {
    Router, Route, Switch, Redirect,
} from 'react-router-dom';

import PropTypes from 'prop-types';

import DashboardLayout from '../Components/Layout/Dashboard/DashboardLayout';
import AuthLayout from '../Components/Layout/Auth/AuthLayout';
import NotFound from '../Components/404';
import Home from '../Components/Home';
import Private from '../Components/Home/private';
import LogIn from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';
import { verifyToken } from '../Utils/setAuthToken';
import store from '../Store';

const history = createHistory();

// TODO: Fix default clear error
// history.listen((location) => {
history.listen(() => {
    // Dispatch action depending on location...
    store.dispatch({
        type: 'CLEAR_ERROR_MESSAGES',
    });
});

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const status = Object.values({ ...rest.location.state })[0];
    // console.log('+++++', rest.type);
    const hasAuthenticated = verifyToken(localStorage.token);

    if (!hasAuthenticated && !rest.type) {
        return (<Redirect to="/login" />);
    }
    if (hasAuthenticated && rest.computedMatch.path === '/login') {
        return (<Redirect to="/" />);
    }

    if (status === 404) {
        return (
            <Route
              {...rest}
              render={props => (
                  <Layout>
                      <NotFound {...props} />
                  </Layout>
                )}
            />
        );
    }
    return (
        <Route
          {...rest}
          render={props => (
              (rest.type === 'private')
              ? (
                  (hasAuthenticated)
                  ? (
                      <Layout>
                          <Component {...props} />
                      </Layout>
                   )
                  : <Redirect to="/login" />
              )
              : (
                  <Layout>
                      <Component {...props} />
                  </Layout>
               )
            )}
        />
    );
};

AppRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    layout: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

const Switches = () => (
    <Router history={history}>
        <div>
            <Switch>
                <AppRoute path="/login" type="public" exact component={LogIn} layout={AuthLayout} />
                <AppRoute path="/signup" type="public" exact component={SignUp} layout={AuthLayout} />
                <AppRoute path="/" type="private" exact component={Home} layout={DashboardLayout} />
                <AppRoute path="/private" type="private" exact component={Private} layout={DashboardLayout} />
                <AppRoute path="*" exact component={NotFound} layout={DashboardLayout} status={404} />
            </Switch>
        </div>
    </Router>
);

export default Switches;
