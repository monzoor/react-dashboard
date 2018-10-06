import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './assets/less/Ant.less';
import './assets/scss/App.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
registerServiceWorker();
