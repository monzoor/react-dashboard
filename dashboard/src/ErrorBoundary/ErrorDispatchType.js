import {
    NOT_FOUND_ERROR, SERVER_ERROR, CLEAR_ERROR_MESSAGES, ITEM_EXISTS,
} from './_constant';

const errorInfoGenerator = (response) => {
    // console.log('info gen', response);
    let errorInfo = {
        status: response.status || null,
        messages: response.message || null,
        hasErrors: true,
        componentError: response.componentError || null,
    };
    if (!response) {
        errorInfo = {};
    }
    return errorInfo;
};
const ErrorDispatch = (dispatch, type, response) => {
    const errorInfos = errorInfoGenerator(response);
    // console.log('--mytype', type, errorInfos);
    switch (type) {
    case CLEAR_ERROR_MESSAGES: {
        const errorInfo = {};
        return dispatch({ type, errorInfo });
    }
    case NOT_FOUND_ERROR: {
        // console.log('-----Not found Errors');
        return dispatch({ type, errorInfos });
    }

    case ITEM_EXISTS: {
        // console.log('-----USER_EXISTS');
        return dispatch({ type, errorInfos });
    }

    case SERVER_ERROR: {
        // console.log('-----SERVER_ERROR');
        return dispatch({ type, errorInfos });
    }

    default:
        // console.log('-----Others');
        return dispatch({ type, errorInfos });
    }
};
export default ErrorDispatch;
