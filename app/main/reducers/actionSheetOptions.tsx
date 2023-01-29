import { createRef } from 'react';

const initialState = {
    ref1: createRef(),
    ref2: createRef(),
    ref3: createRef(),
    ref4: createRef(),
};

function rootReducer(state = initialState, action) {
    return state;
}

export default rootReducer;