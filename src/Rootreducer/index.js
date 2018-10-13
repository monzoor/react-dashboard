import { combineReducers } from 'redux';

import ad from '../Components/AdDetails/adReducer';
import auth from '../Reducers/authReducers';

export default combineReducers({
    ad,
    auth,
});
