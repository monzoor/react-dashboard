import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import { setAuthTokenToHeader, verifyToken } from '../Utils/setAuthToken';
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

const goodToken = verifyToken(localStorage.token);
if (goodToken) {
    setAuthTokenToHeader(localStorage.token);
    const users = jwt.decode(localStorage.token);
    store.dispatch({
        type: 'SET_USER',
        users,
    });
}
export default store;
