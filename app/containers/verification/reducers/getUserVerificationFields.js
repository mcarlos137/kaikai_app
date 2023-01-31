import {
  GET_USER_VERIFICATION_FIELDS,
} from "../../../constants/action-types";

const initialState = {
  //GET_USER_VERIFICATION_FIELDS
  getUserVerificationFieldsState: {},
  getUserVerificationFieldsStatusState: '',
  getUserVerificationFieldsDecoratedState: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_USER_VERIFICATION_FIELDS) {
    return Object.assign({}, state, {
      token1: state.getUserVerificationFieldsState = action.payload,
      token2: state.getUserVerificationFieldsStatusState = '200',
    });
  }
  if (action.type === 'GET_USER_VERIFICATION_FIELDS_STATUS') {
    return Object.assign({}, state, {
      token: state.getUserVerificationFieldsStatusState = action.payload,
    });
  }
  if (action.type === 'GET_USER_VERIFICATION_FIELDS_DECORATED') {
    return Object.assign({}, state, {
      token1: state.getUserVerificationFieldsDecoratedState = action.payload,
      token2: state.getUserVerificationFieldsStatusState = '200',
    });
  }
  return state;
}

export default rootReducer;