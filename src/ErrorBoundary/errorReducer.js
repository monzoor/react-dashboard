import {
    NO_AD_FOUND,
    CLEAR_ERROR_MESSAGES,
    SERVER_ERROR,
    COMPONENT_ERROR
} from './types';

const initialState = {
    payload: [],
}


export default function (state = initialState, action) {
    // console.log('-----error reducer', action);
    switch (action.type) {

        case NO_AD_FOUND: {
            return {
                ...state,
                payload: action.errorInfo
            }
        }
        case SERVER_ERROR: {
            return {
                ...state,
                payload: action.errorInfo
            }
        }
        case COMPONENT_ERROR: {
            return {
                ...state,
                payload: action.errorInfo
            }
        }

        default :
            return initialState;

    }
}
