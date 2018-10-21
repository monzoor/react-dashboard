import { combineReducers } from 'redux';

import auth from '../Reducers/authReducers';
import errors from '../ErrorBoundary/ErrorReducer';

export default combineReducers({
    auth,
    errors,
});
