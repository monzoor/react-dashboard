import axios from 'axios';
import jwt from 'jsonwebtoken';

export function setAuthTokenToHeader(token) {
    if (token) {
        axios.defaults.headers.common.authorization = `Bearer ${token}`;
        return;
    }
    delete axios.defaults.headers.common.authorization;
}

export function verifyToken(token) {
    // console.log('has auth?');
    const users = jwt.decode(token);
    const currentTime = Date.now() / 1000;
    console.log('0000000', users);
    if (users && 'name' in users && 'email' in users && 'exp' in users && currentTime < users.exp) {
        return true;
    }
    localStorage.removeItem('token');
    return false;
    // return !!(localStorage.token);
}
