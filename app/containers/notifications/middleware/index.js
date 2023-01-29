import {
    GET_NOTIFICATIONS
} from "../../../constants/action-types";

export function noAction({ dispatch }) {
    return function (next) {
        return function (action) {
            return next(action);
        };
    };
}

export function decorateResponse({ dispatch }) {
    return function (next) {
        return function (action) {
            // do your stuff
            if (action.type === GET_NOTIFICATIONS) {
                return dispatch({ type: 'GET_NOTIFICATIONS_DECORATED', payload: decorateGetNotificationsResponse(action.payload) });
            }
            return next(action);
        };
    };
}

const decorateGetNotificationsResponse = (response) => {
    let finalDecoratedResponse = [];
    Object.entries(response).forEach(([key, value]) => {
        let contentParts = value.content.split('\\n');
        value.contentParts = contentParts;
        finalDecoratedResponse.push(value);
    });
    return response;
};

