import { GET_AD } from './types';

const initialState = {
    payload: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_AD: {
        return {
            ...state,
            payload: action.payload,
        };
    }

    default:
        return state;
    }
}
