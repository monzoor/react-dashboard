import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from '../Routes';
import reduxStore from '../Store';


class App extends Component {
    render() {
        return (
            <Routes />
        );
    }
}

const ReduxApp = () => (
    <Provider store={reduxStore}>
        <App />
    </Provider>
);
export default ReduxApp;
