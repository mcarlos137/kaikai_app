import {
  MODIFY_USER_INFO,
} from "../../../constants/action-types";

const initialState = {
  //USER_MODIFY_INFO
  modifyUserInfoState: '',
  modifyUserInfoStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === MODIFY_USER_INFO) {
    return Object.assign({}, state, {
      token1: state.modifyUserInfoState = action.payload,
      token2: state.modifyUserInfoStatusState = '200',
    });
  }
  if (action.type === 'MODIFY_USER_INFO_STATUS') {
    return Object.assign({}, state, {
      token: state.modifyUserInfoStatusState = action.payload,
    });
  }
  return state;
}

export default rootReducer;