import { 
  GET_NOTIFICATIONS,
} from "../../../constants/action-types";

const initialState = {
  getNotificationsState: [],
  getNotificationsStatusState: '',
  getNotificationsDecoratedState: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_NOTIFICATIONS) {
    return Object.assign({}, state, {
      token1: state.getNotificationsState = action.payload,
      token2: state.getNotificationsStatusState = '200'
    });
  }
  if (action.type === 'GET_NOTIFICATIONS_STATUS') {
    return Object.assign({}, state, {
      error: state.getNotificationsStatusState = action.payload
    });
  }
  if (action.type === 'GET_NOTIFICATIONS_DECORATED') {
    return Object.assign({}, state, {
      token1: state.getNotificationsDecoratedState = action.payload,
      token2: state.getNotificationsStatusState = '200'
    });
  }
  return state;
}

export default rootReducer;