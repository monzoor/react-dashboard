import axios from 'axios';
import jwt from 'jsonwebtoken';

const setAuthTokenToHeader = (token) => {
    if (token) {
        axios.defaults.headers.common.authorization = `Bearer ${token}`;
        return;
    }
    delete axios.defaults.headers.common.authorization;
};

const verifyToken = (token) => {
    // console.log('has auth?');
    const users = jwt.decode(token);
    const currentTime = Date.now() / 1000;
    if (users && 'name' in users && 'email' in users && 'exp' in users && currentTime < users.exp) {
        return true;
    }
    localStorage.removeItem('token');
    return false;
    // return !!(localStorage.token);
};

export {
    setAuthTokenToHeader,
    verifyToken,
};
