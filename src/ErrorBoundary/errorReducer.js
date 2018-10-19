import { NOT_FOUND_ERROR, SERVER_ERROR } from './_constant';

const initialState = {
    errorInfos: [],
};


export default function (state = initialState, action) {
    // console.log('-----error reducer', action);
    switch (action.type) {
    case NOT_FOUND_ERROR: {
        return {
            ...state,
            errorInfos: action.errorInfos,
        };
    }

    case SERVER_ERROR: {
        return {
            ...state,
            errorInfos: action.errorInfos,
        };
    }

    default:
        return initialState;
    }
}
