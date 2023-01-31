import {
  PROCESS_VERIFICATION,
} from "../../../constants/action-types";

const initialState = {
  startedState: false,
  processIdsState: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === PROCESS_VERIFICATION) {
    return Object.assign({}, state, {
      token: state.startedState = action.payload
    });
  }
  return state;
}

export default rootReducer;