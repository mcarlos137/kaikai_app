import { 
  SHARE_SHORTS, 
} from "../../../constants/action-types";

const initialState = {
  shareState: '',
  shareStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === SHARE_SHORTS) {
    return Object.assign({}, state, {
      token1: state.shareState = action.payload,
      token3: state.shareStatusState = '200'
    });
  }
  if (action.type === 'SHARE_SHORTS_STATUS') {
    return Object.assign({}, state, {
      error: state.shareStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;