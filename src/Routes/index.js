import React from 'react';

import {
    BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import PropTypes from 'prop-types';

import MainLayout from '../Components/Layout';
import AuthLayout from '../Components/Layout/AuthLayout';
import NotFound from '../Components/404';
import Home from '../Components/Home';
import Private from '../Components/Home/test';
import Login from '../Components/Auth';
import { isAuth } from '../Utils/setAuthToken';


const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const status = Object.values({ ...rest.location.state })[0];
    // console.log('+++++', rest.type);
    const hasAuthenticated = isAuth();

    // if (!isAuth && rest.computedMatch.path !== '/login') {
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

    // return (<Route {...rest} render={props => (<LayoutToRender {...props} />)} />);
    // return (<Route {...rest} render={props => ((rest.type === 'private') ? ((isAuth) ? <LayoutToRender {...props} /> : <Redirect to="/login" />) : <LayoutToRender {...props} />)} />);
};

AppRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    layout: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};


const Switches = () => (
    <Router>
        <div>
            <Switch>
                <AppRoute path="/login" type="public" exact component={Login} layout={AuthLayout} />
                <AppRoute path="/" type="private" exact component={Home} layout={MainLayout} />
                <AppRoute path="/private" type="private" exact component={Private} layout={MainLayout} />
                <AppRoute path="*" exact component={NotFound} layout={MainLayout} status={404} />
            </Switch>
        </div>
    </Router>
);
export default Switches;

// <Router>
//     {(!isAuth)
//         ? (
//             <Switch>
//                 <AppRoute path="/login" exact component={Login} layout={AuthLayout} />
//                 <Redirect to="/login" />
//             </Switch>
//         )
//         : (
//             <Switch>
//                 <AppRoute path="/" exact component={Home} layout={MainLayout} />
//                 <AppRoute path="/private" exact component={Home} layout={MainLayout} />
//                 <AppRoute path="*" exact component={NotFound} layout={MainLayout} status={404} />
//             </Switch>
//         )
//     }
//
// </Router>
// <Switch>
//     <AppRoute path="*" exact component={NotFound} layout={MainLayout} status={404} />
// </Switch>

// const status = Object.values({ ...rest.location.state })[0] || null;
// <AppRoute path="/ads/:adSlug=:uid" exact layout={MainLayout} component={AdDetails} />
// <AppRoute path="*" exact layout={MainLayout} component={NotFound} status={404} />
