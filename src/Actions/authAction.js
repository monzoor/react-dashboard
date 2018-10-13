import axios from 'axios';
import { GET_AD } from './types';
// import ErrorDispatch from '../ErrorBoundary/ErrorDispatchType';


export default function auth() {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR_MESSAGES',
        });
        return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            name: 'Fred',
            email: 'Flintstone',
            password: 'Flintstone',
        })
            .then((response) => {
                console.log(response);
                dispatch({
                    type: GET_AD,
                    payload: response,
                });
            })
            .catch((error) => {
                console.log(error);
                // ErrorDispatch(dispatch, error);
            });
        // return fetch(process.env.REACT_APP_API_HOST+'/ads?id=' + uid + '&slug=' + slug)
        // .then ((response) => {
        //     if (!response.ok) {
        //         return response.json().then(() => {
        //             ErrorDispatch (dispatch, response)
        //         });
        //     }
        //     return response.json().then((ad) => {
        //         if (ad.length === 0) {
        //             console.log('-------');
        //             ErrorDispatch (dispatch, 'NO_AD_FOUND', {status: 404, statusText: 'No ad found'});
        //             return;
        //         }
        //         dispatch({
        //             type: GET_AD,
        //             payload: ad
        //         })
        //     });
        // })
        // .catch((err) => {
        //     ErrorDispatch (dispatch, 'SERVER_ERROR', {status: 500, statusText: 'Server error in ad details'})
        // })
    };
}

/**
 * [errorDispatch description]
 * @param  {[method]} dispatch
 * @param  {[object]} response response from fetch
 */
// function errorDispatch (dispatch, response){
//     dispatch({
//         type: NO_AD_FOUND,
//         errorInfo: {
//             status: response.status,
//             messages: response.statusText,
//             hasErros: true
//         }
//     });
// }
