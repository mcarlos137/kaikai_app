import { 
  REACT_SHORTS, 
} from "../../../constants/action-types";

const initialState = {
  reactState: '',
  reactStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === REACT_SHORTS) {
    return Object.assign({}, state, {
      token1: state.reactState = action.payload,
      token3: state.reactStatusState = '200'
    });
  }
  if (action.type === 'REACT_SHORTS_STATUS') {
    return Object.assign({}, state, {
      error: state.reactStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;