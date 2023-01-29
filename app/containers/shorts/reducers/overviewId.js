import { 
  GET_SHORTS_OVERVIEW_ID, 
} from "../../../constants/action-types";

const initialState = {
  overviewIdState: '',
  overviewIdStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_SHORTS_OVERVIEW_ID) {
    return Object.assign({}, state, {
      token1: state.overviewIdState = action.payload,
      token3: state.overviewIdStatusState = '200'
    });
  }
  if (action.type === 'GET_SHORTS_OVERVIEW_ID_STATUS') {
    return Object.assign({}, state, {
      error: state.overviewIdStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;