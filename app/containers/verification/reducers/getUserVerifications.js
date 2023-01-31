import {
  GET_USER_VERIFICATIONS,
} from "../../../constants/action-types";

const initialState = {
  //GET_USER_VERIFICATION_FIELDS
  getUserVerificationsState: {},
  getUserVerificationsStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_USER_VERIFICATIONS) {
    return Object.assign({}, state, {
      token1: state.getUserVerificationsState = action.payload,
      token2: state.getUserVerificationsStatusState = '200',
    });
  }
  if (action.type === 'GET_USER_VERIFICATIONS_STATUS') {
    return Object.assign({}, state, {
      token: state.getUserVerificationsStatusState = action.payload,
    });
  }
  return state;
}

export default rootReducer;