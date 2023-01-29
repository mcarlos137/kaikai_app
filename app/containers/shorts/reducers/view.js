import { 
  VIEW_SHORTS, 
} from "../../../constants/action-types";

const initialState = {
  viewState: '',
  viewStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === VIEW_SHORTS) {
    return Object.assign({}, state, {
      token1: state.viewState = action.payload,
      token3: state.viewStatusState = '200'
    });
  }
  if (action.type === 'VIEW_SHORTS_STATUS') {
    return Object.assign({}, state, {
      error: state.viewStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;