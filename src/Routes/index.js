import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';


import MainLayout from '../Components/Layout';
import NotFound from '../Components/404';
import Home from '../Components/Home';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const status = Object.values({ ...rest.location.state })[0];
    if (status === 404) {
        const NotFoundTemp = (
            <Layout>
                <NotFound />
            </Layout>);
        return (<Route {...rest} render={() => (<NotFoundTemp />)} />);
    }
    const Main = () => (
        <Layout>
            <Component />
        </Layout>
    );
    return (<Route {...rest} render={props => (<Main {...props} />)} />);
};

AppRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    layout: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};


const Switches = () => (
    <Router>
        <Switch>
            <AppRoute path="/dashboard" exact component={Home} layout={MainLayout} />
            <AppRoute path="*" exact layout={MainLayout} component={NotFound} status={404} />
        </Switch>
    </Router>
);
export default Switches;


// <AppRoute path="/ads/:adSlug=:uid" exact layout={MainLayout} component={AdDetails} />
// <AppRoute path="*" exact layout={MainLayout} component={NotFound} status={404} />
