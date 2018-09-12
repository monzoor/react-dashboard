import { GET_AD, NO_AD_FOUND } from './type';

const initialState = {
    payload: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_AD:
        return {
            ...state,
            payload: action.payload,
        };
    case NO_AD_FOUND: {
        return {
            ...state,
            payload: action.errorInfo,
        };
    }
    default:
        return state;
    }
}
