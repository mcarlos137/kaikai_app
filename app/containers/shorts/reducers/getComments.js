import { 
  GET_SHORTS_COMMENTS, 
} from "../../../constants/action-types";

const initialState = {
  getCommentsState: [],
  getCommentsStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_SHORTS_COMMENTS) {
    return Object.assign({}, state, {
      token1: state.getCommentsState = action.payload,
      token3: state.getCommentsStatusState = '200'
    });
  }
  if (action.type === 'GET_SHORTS_COMMENTS_STATUS') {
    return Object.assign({}, state, {
      error: state.getCommentsStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;