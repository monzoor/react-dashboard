import { combineReducers } from 'redux';

import auth from '../Reducers/authReducers';
import errors from '../ErrorBoundary/ErrorReducer';
import addProductDetails from '../Reducers/addProdcutReducers';

export default combineReducers({
    auth,
    errors,
    addProductDetails,
});