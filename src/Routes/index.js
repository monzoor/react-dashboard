import React from 'react';
import {
    BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';


import MainLayout from '../Components/Layout';
import AuthLayout from '../Components/Layout/AuthLayout';
import NotFound from '../Components/404';
import Home from '../Components/Home';
import Login from '../Components/Auth';

const fakeAuth = {
    isAuth: false,
    authenticate(cb) {
        this.isAuth = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        this.isAuth = false;
        setTimeout(cb, 100);
    },
};

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const status = Object.values({ ...rest.location.state })[0];

    let LayoutToRender = () => (
        <Layout>
            <Component />
        </Layout>
    );
    if (status === 404) {
        LayoutToRender = () => (
            <Layout>
                <NotFound />
            </Layout>);
    }

    return (<Route {...rest} render={props => ((rest.type === 'private') ? ((fakeAuth.isAuth === true) ? <LayoutToRender {...props} /> : <Redirect to="/login" />) : <LayoutToRender {...props} />)} />);
};

AppRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    layout: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};


const Switches = () => (
    <Router>
        <Switch>
            <AppRoute path="/login" type="public" exact component={Login} layout={AuthLayout} />
            <AppRoute path="/dashboard" type="private" exact component={Home} layout={MainLayout} />
            <AppRoute path="/private" type="private" exact component={Home} layout={MainLayout} />
            <AppRoute path="*" exact component={NotFound} layout={MainLayout} status={404} />
        </Switch>
    </Router>
);
export default Switches;


// <AppRoute path="/ads/:adSlug=:uid" exact layout={MainLayout} component={AdDetails} />
// <AppRoute path="*" exact layout={MainLayout} component={NotFound} status={404} />
