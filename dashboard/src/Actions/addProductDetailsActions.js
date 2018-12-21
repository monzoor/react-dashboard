import {
    PRODUCT_IMAGES,
    PRODUCT_DETAILS,
    CLEAR_ERROR_MESSAGES,
} from './_constant';
// import ErrorDispatch from '../ErrorBoundary/ErrorDispatchType';


export const imgaeUpload = images => ((dispatch) => {
    dispatch({
        type: CLEAR_ERROR_MESSAGES,
    });
    dispatch({
        type: PRODUCT_IMAGES,
        images,
    });
});

export const addProductDetails = details => ((dispatch) => {
    dispatch({
        type: CLEAR_ERROR_MESSAGES,
    });
    dispatch({
        type: PRODUCT_DETAILS,
        details,
    });
});

export function signup() {
    // console.log('----');
    // return (dispatch) => {
    //     dispatch({
    //         type: CLEAR_ERROR_MESSAGES,
    //     });
    //     return axios.post('/api/users', formData)
    //         .then((response) => {
    //             if (response.data) {
    //                 const newFormData = {
    //                     email: formData.email,
    //                     password: formData.password,
    //                 };
    //                 dispatch(auth(props, newFormData));
    //             }
    //         })
    //         .catch((error) => {
    //             const errorStatus = error.response;
    //             if (!errorStatus) {
    //                 const serverError = {
    //                     status: 500,
    //                     message: 'Something went wrong. Please try again later.',
    //                     componentError: true,
    //                 };
    //                 ErrorDispatch(dispatch, 'SERVER_ERROR', serverError);
    //             } else {
    //                 // errorStatus.data.componentError = true;
    //                 ErrorDispatch(dispatch, 'ITEM_EXISTS', errorStatus.data);
    //             }
    //         });
    // };
}
