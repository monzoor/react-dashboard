// import { NO_AD_FOUND } from './types';

const dispatcher = (dispatch, type, response) => {
    console.log(response);
    dispatch({
        type: type,
        errorInfo: {
            status: response.status || null,
            messages: response.statusText || null,
            hasErros: true,
            componentError: response.componentError || null
        }
    });
}
const ErrorDispatch = (dispatch, type, response) => {
    console.log('--mytype', response);
    switch (type) {
        case 'NO_AD_FOUND': {
            console.log('-----NO_AD_FOUND');
            return dispatcher(dispatch, type, response);
        }

        case 'SERVER_ERROR': {
            console.log('-----SERVER_ERROR');
            return dispatcher(dispatch, type, response);
        }

        default:
            console.log('-----Others');
            return dispatcher(dispatch, type, response);
    }

};
export default ErrorDispatch;
