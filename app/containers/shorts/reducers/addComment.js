import {
  ADD_SHORTS_COMMENT,
} from "../../../constants/action-types";

const initialState = {
  addCommentState: '',
  addCommentStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_SHORTS_COMMENT) {
    return Object.assign({}, state, {
      token1: state.addCommentState = action.payload,
      token3: state.addCommentStatusState = '200'
    });
  }
  if (action.type === 'ADD_SHORTS_COMMENT_STATUS') {
    return Object.assign({}, state, {
      error: state.addCommentStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;