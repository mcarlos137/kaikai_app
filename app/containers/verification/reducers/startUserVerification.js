import {
  START_USER_VERIFICATION,
} from "../../../constants/action-types";

const initialState = {
  //START_USER_VERIFICATION
  startUserVerificationState: '',
  startUserVerificationStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === START_USER_VERIFICATION) {
    return Object.assign({}, state, {
      token1: state.startUserVerificationState = action.payload,
      token2: state.startUserVerificationStatusState = '200',
    });
  }
  if (action.type === 'START_USER_VERIFICATION_STATUS') {
    return Object.assign({}, state, {
      token: state.startUserVerificationStatusState = action.payload,
    });
  }
  return state;
}

export default rootReducer;