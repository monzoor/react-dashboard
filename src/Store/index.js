import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootRecucer from '../Rootreducer';

const initialState = {};

const middleware = [thunk];

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'MyApp', actionsBlacklist: ['REDUX_STORAGE_SAVE'] }) : compose;
/* eslint-enable */

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
);

const store = createStore(rootRecucer, initialState, enhancer);

export default store;
