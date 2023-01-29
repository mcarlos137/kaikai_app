import {
  CHANGE_STATUS_SHORTS,
} from "../../../constants/action-types";

const initialState = {
  changeStatusState: '',
  changeStatusStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === CHANGE_STATUS_SHORTS) {
    return Object.assign({}, state, {
      token1: state.changeStatusState = action.payload,
      token2: state.changeStatusStatusState = '200'
    });
  }
  if (action.type === 'CHANGE_STATUS_SHORTS_STATUS') {
    return Object.assign({}, state, {
      error: state.changeStatusStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;