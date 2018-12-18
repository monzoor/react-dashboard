import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';// TODO: need a config file for language
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
        <LocaleProvider locale={enUS}>
            <App />
        </LocaleProvider>
    </Provider>
);
export default ReduxApp;
