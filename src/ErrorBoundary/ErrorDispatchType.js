import { NOT_FOUND_ERROR, SERVER_ERROR } from './_constant';

const errorInfoGenerator = (response) => {
    // console.log('info gen', response);
    const errorInfo = {
        status: response.status || null,
        messages: response.message || null,
        hasErrors: true,
        componentError: response.componentError || null,
    };
    return errorInfo;
};
const ErrorDispatch = (dispatch, type, response) => {
    const errorInfos = errorInfoGenerator(response);
    // console.log('--mytype', type, errorInfos);
    switch (type) {
    case NOT_FOUND_ERROR: {
        console.log('-----Errors');
        return dispatch({ type, errorInfos });
    }

    case SERVER_ERROR: {
        console.log('-----SERVER_ERROR');
        return dispatch({ type, errorInfos });
    }

    default:
        console.log('-----Others');
        return dispatch({ type, errorInfos });
    }
};
export default ErrorDispatch;
