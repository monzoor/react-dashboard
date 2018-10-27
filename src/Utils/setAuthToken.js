import axios from 'axios';

export function setAuthToken(token) {
    if (token) {
        console.log('token found');
        axios.defaults.headers.common.authorization = `Bearer ${token}`;
        return;
    }
    console.log('no found');
    delete axios.defaults.headers.common.authorization;
    // return false;
}

export function isAuth() {
    // console.log('has auth?');
    return !!(localStorage.token);
}
