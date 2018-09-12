import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './assets/scss/App.scss';
import './assets/less/Ant.less';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
registerServiceWorker();
