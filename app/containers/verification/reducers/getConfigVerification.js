import { 
  GET_CONFIG_VERIFICATION,
} from "../../../constants/action-types";

const initialState = {
  getConfigVerificationState: {},
  getConfigVerificationStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_CONFIG_VERIFICATION) {
    return Object.assign({}, state, {
      token1: state.getConfigVerificationState = action.payload,
      token2: state.getConfigVerificationStatusState = '200'
    });
  }
  if (action.type === 'GET_CONFIG_VERIFICATION_STATUS') {
    return Object.assign({}, state, {
      error: state.getConfigVerificationStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;