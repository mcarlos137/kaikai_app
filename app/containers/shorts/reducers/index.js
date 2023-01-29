import React, { createRef } from 'react';
import {
    PUSH_SHORTS_DATA,
    UPDATE_SHORTS_DATA,
    UPDATE_SHORTS_DATA_VALUE,
    CLEAR_SHORTS_DATA,
    SET_SELECTED_SHORTS_ID,
    MODIFY_SHORTS_VIDEO_THUMBNAILS,
    IS_LOADING,
    UPDATE_DATA
} from "../../../constants/action-types";

const initialState = {
    dataState: [],
    actionSheetDocumentRefState: createRef(),
    selectedIdState: null,
    updateCountState: 0,
    videoThumbnailsState: {},
    isLoadingState: true,
    updateDataState: false,
};

function rootReducer(state = initialState, action) {
    if (action.type === UPDATE_DATA) {
        return Object.assign({}, state, {
            token: state.updateDataState = action.payload,
        });
    }
    if (action.type === IS_LOADING) {
        return Object.assign({}, state, {
            token: state.isLoadingState = action.payload,
        });
    }
    if (action.type === MODIFY_SHORTS_VIDEO_THUMBNAILS) {
        if (state.videoThumbnailsState[action.payload.key] === undefined) {
            let videoThumbnails = JSON.parse(JSON.stringify(state.videoThumbnailsState))
            videoThumbnails[action.payload.key] = action.payload.source
            return Object.assign({}, state, {
                token: state.videoThumbnailsState = videoThumbnails,
            });
        }
    }
    if (action.type === SET_SELECTED_SHORTS_ID) {
        return Object.assign({}, state, {
            token: state.selectedIdState = action.payload,
        });
    }
    if (action.type === CLEAR_SHORTS_DATA) {
        return Object.assign({}, state, {
            token: state.dataState = [],
        });
    }
    if (action.type === PUSH_SHORTS_DATA) {
        let data = state.dataState.slice(0);
        data.push(action.payload)
        return Object.assign({}, state, {
            token: state.dataState = data,
        });
    }
    if (action.type === UPDATE_SHORTS_DATA) {
        state.dataState = action.payload
        return Object.assign({}, state, {
            token: state.updateCountState = state.updateCountState + 1,
        });
    }
    if (action.type === UPDATE_SHORTS_DATA_VALUE) {
        state.dataState.find((item) => {
            if (item.id === state.selectedIdState) {
                item[action.payload.key] = action.payload.value
            }
        });
        return Object.assign({}, state, {
            token: state.updateCountState = state.updateCountState + 1,
        });
    }
    return state;
}

export default rootReducer;