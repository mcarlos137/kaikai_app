import { 
  GET_SHORTS_OVERVIEW_DATA, 
} from "../../../constants/action-types";

const initialState = {
  overviewDataState: [],
  overviewDataStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_SHORTS_OVERVIEW_DATA) {
    return Object.assign({}, state, {
      token1: state.overviewDataState = action.payload,
      token3: state.overviewDataStatusState = '200'
    });
  }
  if (action.type === 'GET_SHORTS_OVERVIEW_DATA_STATUS') {
    return Object.assign({}, state, {
      error: state.overviewDataStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;