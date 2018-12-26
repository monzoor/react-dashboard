import { PRODUCT_IMAGES, PRODUCT_DETAILS } from './types';

const initialState = {
    currentSteps: {
        item: 0,
        status: 'wait',
    },
    images: [],
    details: {
        title: '',
        categories: [],
        description: '',
    },
};

export default function (state = initialState, action) {
    // console.log('--sss---', state);
    switch (action.type) {
    case PRODUCT_IMAGES:
        return {
            ...state,
            currentSteps: {
                item: 1,
                status: 'finish',
            },
            images: action.images,
        };

    case PRODUCT_DETAILS:
        return {
            ...state,
            currentSteps: {
                item: 2,
                status: 'finish',
            },
            details: action.details,
        };

    default:
        return state;
    }
}
