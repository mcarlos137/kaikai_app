import {
  START_USER_VERIFICATION_EMAIL,
} from "../../../constants/action-types";

const initialState = {
  //START_USER_VERIFICATION
  startUserVerificationEmailState: '',
  startUserVerificationEmailStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === START_USER_VERIFICATION_EMAIL) {
    return Object.assign({}, state, {
      token1: state.startUserVerificationEmailState = action.payload,
      token2: state.startUserVerificationEmailStatusState = '200',
    });
  }
  if (action.type === 'START_USER_VERIFICATION_EMAIL_STATUS') {
    return Object.assign({}, state, {
      token: state.startUserVerificationEmailStatusState = action.payload,
    });
  }
  return state;
}

export default rootReducer;