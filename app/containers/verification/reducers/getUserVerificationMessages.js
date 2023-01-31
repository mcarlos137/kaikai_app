import {
  GET_USER_VERIFICATION_MESSAGES,
} from "../../../constants/action-types";

const initialState = {
  getUserVerificationMessagesState: {},
  getUserVerificationMessagesStatusState: '',
  getUserVerificationMessagesDecoratedState: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_USER_VERIFICATION_MESSAGES) {
    return Object.assign({}, state, {
      token1: state.getUserVerificationMessagesState = action.payload,
      token2: state.getUserVerificationMessagesStatusState = '200',
    });
  }
  if (action.type === 'GET_USER_VERIFICATION_MESSAGES_STATUS') {
    return Object.assign({}, state, {
      token: state.getUserVerificationMessagesStatusState = action.payload,
    });
  }
  if (action.type === 'GET_USER_VERIFICATION_MESSAGES_DECORATED') {
    return Object.assign({}, state, {
      token1: state.getUserVerificationMessagesDecoratedState = action.payload,
      token2: state.getUserVerificationMessagesStatusState = '200',
    });
  }
  return state;
}

export default rootReducer;