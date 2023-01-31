import { createRef } from "react";
import {
  SET_VERIFICATION_TYPE,
  SET_VERIFICATION_TYPE_STATUS,
  SET_VERIFICATION_FIELDS,
  SET_VERIFICATION_DATA,
  SET_VERIFICATION_PHOTO_FIELD_NAME,
  SET_VERIFICATION_DATA_FIELD_VALUE,
  OPEN_DATE_MODAL,
  SET_VERIFICATION_MESSAGES,
} from "../../../constants/action-types";

const initialState = {
  //SET_VERIFICATION_TYPE
  typeState: '',
  //SET_VERIFICATION_TYPE_STATUS
  typeStatusState: '',
  //SET_VERIFICATION_FIELDS
  fieldsState: [],
  //SET_VERIFICATION_DATA
  dataState: {},
  photoFieldNameState: '',
  actionSheetDocumentRefState: createRef(),
  openDateModalState: false,
  messagesState: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === OPEN_DATE_MODAL) {
    return Object.assign({}, state, {
      token: state.openDateModalState = action.payload,
    });
  }
  if (action.type === SET_VERIFICATION_DATA_FIELD_VALUE) {
    let data = JSON.parse(JSON.stringify(state.dataState));
    data[action.payload.field] = { value: action.payload.value, editable: action.payload.editable };
    return Object.assign({}, state, {
      token: state.dataState = data,
    });
  }
  if (action.type === SET_VERIFICATION_PHOTO_FIELD_NAME) {
    return Object.assign({}, state, {
      token: state.photoFieldNameState = action.payload,
    });
  }
  if (action.type === SET_VERIFICATION_DATA) {
    return Object.assign({}, state, {
      token: state.dataState = action.payload,
    });
  }
  if (action.type === SET_VERIFICATION_FIELDS) {
    return Object.assign({}, state, {
      token: state.fieldsState = action.payload,
    });
  }
  if (action.type === SET_VERIFICATION_MESSAGES) {
    return Object.assign({}, state, {
      token: state.messagesState = action.payload,
    });
  }
  if (action.type === SET_VERIFICATION_TYPE_STATUS) {
    return Object.assign({}, state, {
      token: state.typeStatusState = action.payload,
    });
  }
  if (action.type === SET_VERIFICATION_TYPE) {
    return Object.assign({}, state, {
      token: state.typeState = action.payload,
    });
  }
  return state;
}

export default rootReducer;