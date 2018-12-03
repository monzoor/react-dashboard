import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable */
// import { registerObserver } from 'react-perf-devtool';
/* eslint-enable */
import App from './Components/App';
// import './assets/less/Ant.less';
import './assets/scss/App.scss';
// TODO: Turn on service worker
// import registerServiceWorker from './registerServiceWorker';
// registerObserver();
ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
// registerServiceWorker();
