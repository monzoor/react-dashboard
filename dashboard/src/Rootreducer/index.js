import { combineReducers } from 'redux';

import auth from '../Components/Auth/_Reducers/authReducers';
import errors from '../ErrorBoundary/ErrorReducer';
import addProductDetails from '../Components/Product/_Reducers/addProdcutReducers';

export default combineReducers({
    auth,
    errors,
    addProductDetails,
});
