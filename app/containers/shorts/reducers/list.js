import { 
  LIST_SHORTS, 
} from "../../../constants/action-types";

const initialState = {
  listState: [],
  listStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === LIST_SHORTS) {
    return Object.assign({}, state, {
      token1: state.listState = action.payload,
      token3: state.listStatusState = '200'
    });
  }
  if (action.type === 'LIST_SHORTS_STATUS') {
    return Object.assign({}, state, {
      error: state.listStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;