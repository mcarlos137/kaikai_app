import { createRef } from "react";
import {
    IS_LOADING,
    SET_ORDER_DATA,
    SET_SELECTED_ORDER,
    SET_SELECTED_TAB
} from "../../../constants/action-types";

const initialState = {
    dataState: { current: [], old: [] },
    updateCountState: 0,
    selectedTabState: 0,
    actionSheetConfirmationCloseRefState: createRef(),
    selectedOrderState: {},
    isLoadingState: true
};

function rootReducer(state = initialState, action) {
    if (action.type === IS_LOADING) {
        return Object.assign({}, state, {
            token: state.isLoadingState = action.payload,
        });
    }
    if (action.type === SET_SELECTED_ORDER) {
        return Object.assign({}, state, {
            token: state.selectedOrderState = action.payload,
        });
    }
    if (action.type === SET_SELECTED_TAB) {
        return Object.assign({}, state, {
            token: state.selectedTabState = action.payload,
        });
    }
    if (action.type === SET_ORDER_DATA) {
        if (action.payload.current !== undefined) {
            state.dataState.current = action.payload.current
        }
        if (action.payload.old !== undefined) {
            state.dataState.old = action.payload.old
        }
        return Object.assign({}, state, {
            token: state.updateCountState = state.updateCountState + 1,
        });
    }
    return state;
}

export default rootReducer;