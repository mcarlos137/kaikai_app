import {
  SET_GIFT_CARD_REDEEM_ID,
  SET_GIFT_CARD_REDEEM_TYPE,
  SET_GIFT_CARD_REDEEM_SELECTED_CURRENCY,
  SET_GIFT_CARD_REDEEM_AMOUNT,
  SET_GIFT_CARD_REDEEM_FACTOR_AMOUNT,
  SET_GIFT_CARD_REDEEM_COMMISSION,
  OPEN_MODAL,
  SET_CONFIRMATION_MODAL_MESSAGE,
} from "../../../constants/action-types";

const initialState = {
  idState: '',
  typeState: '',
  selectedCurrencyState: {},
  amountState: '',
  factorAmountState: 0,
  commissionState: {},
  openModalState: false,
  confirmationModalMessageState: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_CONFIRMATION_MODAL_MESSAGE) {
    return Object.assign({}, state, {
      token: state.confirmationModalMessageState = action.payload,
    });
  }
  if (action.type === OPEN_MODAL) {
    return Object.assign({}, state, {
      token: state.openModalState = action.payload,
    });
  }
  if (action.type === SET_GIFT_CARD_REDEEM_COMMISSION) {
    return Object.assign({}, state, {
      token: state.commissionState = action.payload,
    });
  }
  if (action.type === SET_GIFT_CARD_REDEEM_FACTOR_AMOUNT) {
    return Object.assign({}, state, {
      token: state.factorAmountState = action.payload,
    });
  }
  if (action.type === SET_GIFT_CARD_REDEEM_AMOUNT) {
    return Object.assign({}, state, {
      token: state.amountState = action.payload,
    });
  }
  if (action.type === SET_GIFT_CARD_REDEEM_SELECTED_CURRENCY) {
    return Object.assign({}, state, {
      token: state.selectedCurrencyState = action.payload,
    });
  }
  if (action.type === SET_GIFT_CARD_REDEEM_TYPE) {
    return Object.assign({}, state, {
      token: state.typeState = action.payload,
    });
  }
  if (action.type === SET_GIFT_CARD_REDEEM_ID) {
    return Object.assign({}, state, {
      token: state.idState = action.payload,
    });
  }
  return state;
}

export default rootReducer;