import {
  GET_FINANCIAL_OVERVIEW,
} from "../../../constants/action-types";

const initialState = {
  getFinancialOverviewState: '',
  getFinancialOverviewStatusState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_FINANCIAL_OVERVIEW) {
    return Object.assign({}, state, {
      token1: state.getFinancialOverviewState = action.payload,
      token2: state.getFinancialOverviewStatusState = '200',
    });
  }
  if (action.type === 'GET_FINANCIAL_OVERVIEW_STATUS') {
    return Object.assign({}, state, {
      error: state.getFinancialOverviewStatusState = action.payload
    });
  }
  return state;
}

export default rootReducer;