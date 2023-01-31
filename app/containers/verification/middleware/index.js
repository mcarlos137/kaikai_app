import {
  GET_USER_VERIFICATION_FIELDS, GET_USER_VERIFICATION_MESSAGES,
} from "../../../constants/action-types";

export function noAction({ dispatch }) {
  return function(next) {
    return function(action) {
      return next(action);
    };
  };
}

export function decorateResponse({ dispatch }) {
  return function (next) {
    return function (action) {
      // do your stuff
      if (action.type === GET_USER_VERIFICATION_FIELDS) {
        return dispatch({ type: 'GET_USER_VERIFICATION_FIELDS_DECORATED', payload: decorateGetUserVerificationFieldsResponse(action.payload) });
      }
      return next(action);
    };
  };
}

const decorateGetUserVerificationFieldsResponse = (response) => {
  let decoratedResponse = [];
  Object.entries(response).forEach(([key, value]) => {
    value.name = key;
    decoratedResponse.push(value);
  });
  return decoratedResponse;
}
