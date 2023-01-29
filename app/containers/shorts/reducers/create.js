import {
  CREATE_SHORTS,
} from "../../../constants/action-types";

const initialState = {
  createState: '',
  createStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === CREATE_SHORTS) {
    return Object.assign({}, state, {
      token1: state.createState = action.payload,
      token3: state.createStatusState = '200'
    });
  }
  if (action.type === 'CREATE_SHORTS_STATUS') {
    return Object.assign({}, state, {
      error: state.createStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;