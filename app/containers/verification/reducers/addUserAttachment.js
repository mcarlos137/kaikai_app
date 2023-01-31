import {
  ADD_USER_ATTACHMENT,
} from "../../../constants/action-types";

const initialState = {
  //USER_ADD_ATTACHMENT
  addUserAttachmentState: '',
  addUserAttachmentStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_USER_ATTACHMENT) {
    return Object.assign({}, state, {
      token1: state.addUserAttachmentState = action.payload,
      token2: state.addUserAttachmentStatusState = '200',
    });
  }
  if (action.type === 'ADD_USER_ATTACHMENT_STATUS') {
    return Object.assign({}, state, {
      token: state.addUserAttachmentStatusState = action.payload,
    });
  }
  return state;
}

export default rootReducer;