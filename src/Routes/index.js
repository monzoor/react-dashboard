import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import createHistory from 'history/createBrowserHistory';
import {
    Router, Route, Switch, Redirect,
} from 'react-router-dom';

import PropTypes from 'prop-types';
import { verifyToken } from '../Utils/setAuthToken';
import store from '../Store';
import routes from './RouterConfig';

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
    // console.log('+++++', rest);
    const hasAuthenticated = verifyToken(localStorage.token);
    // TODO: fix login redirect
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
                      <Component {...props} />
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
                {routes.map((route, i) => (
                    <AppRoute
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      path={route.path}
                      type={route.type}
                      exact={route.exact}
                      component={route.component}
                      layout={route.layout}
                      status={route.layout || null}
                    />
                ))}
            </Switch>
        </div>
    </Router>
);

export default Switches;
