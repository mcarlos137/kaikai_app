import { 
  SEND_NOTIFICATION_MESSAGE,
} from "../../../constants/action-types";

const initialState = {
  sendMessageState: [],
  sendMessageStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === SEND_NOTIFICATION_MESSAGE) {
    return Object.assign({}, state, {
      token1: state.sendMessageState = action.payload,
      token2: state.sendMessageStatusState = '200'
    });
  }
  if (action.type === 'SEND_NOTIFICATION_MESSAGE_STATUS') {
    return Object.assign({}, state, {
      error: state.sendMessageStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;