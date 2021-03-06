import { SET_USER } from '../_constant';

const initialState = {
    isAuthenticated: false,
    users: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_USER: {
        return {
            isAuthenticated: !!(action.users),
            users: action.users,
        };
    }

    default:
        return state;
    }
}
