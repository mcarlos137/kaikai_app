import {
  SET_NOTIFICATIONS_DATA,
} from "../../../constants/action-types";

const initialState = {
  dataState: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_NOTIFICATIONS_DATA) {
    return Object.assign({}, state, {
      token: state.dataState = action.payload,
    });
  }
  return state;
}

export default rootReducer;