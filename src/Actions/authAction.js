import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setAuthToken } from '../Utils/setAuthToken';

import { SET_USER, CLEAR_ERROR_MESSAGES } from './_constant';
import ErrorDispatch from '../ErrorBoundary/ErrorDispatchType';


export function auth(props, data) {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ERROR_MESSAGES,
        });
        return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
            .then((response) => {
                const token = response.data.accessToken;
                localStorage.setItem('token', token);
                setAuthToken(token);
                const users = jwt.decode(token);
                dispatch({
                    type: SET_USER,
                    users,
                });
                props.history.push('/');
            })
            .catch((error) => {
                const errorStatus = error.response;
                if (!errorStatus) {
                    const serverError = {
                        status: 500,
                        message: 'Something went wrong. Please try again later.',
                        componentError: true,
                    };
                    ErrorDispatch(dispatch, 'SERVER_ERROR', serverError);
                } else {
                    // errorStatus.data.componentError = true;
                    ErrorDispatch(dispatch, 'NOT_FOUND_ERROR', errorStatus.data);
                }
            });
    };
}

export function signup(props, formData) {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ERROR_MESSAGES,
        });
        return axios.post(`${process.env.REACT_APP_API_URL}/users`, formData)
            .then((response) => {
                if (response.data) {
                    const newFormData = {
                        email: formData.email,
                        password: formData.password,
                    };
                    dispatch(auth(props, newFormData));
                }
            })
            .catch((error) => {
                const errorStatus = error.response;
                if (!errorStatus) {
                    const serverError = {
                        status: 500,
                        message: 'Something went wrong. Please try again later.',
                        componentError: true,
                    };
                    ErrorDispatch(dispatch, 'SERVER_ERROR', serverError);
                } else {
                    // errorStatus.data.componentError = true;
                    ErrorDispatch(dispatch, 'ITEM_EXISTS', errorStatus.data);
                }
            });
    };
}
