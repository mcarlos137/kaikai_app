import { createStore, applyMiddleware, compose } from "redux";
import indexReducer from "../reducers/index";
import getUserVerificationFieldsReducer from "../reducers/getUserVerificationFields";
import getUserVerificationMessagesReducer from "../reducers/getUserVerificationMessages";
import startUserVerificationReducer from "../reducers/startUserVerification";
import startUserVerificationEmailReducer from "../reducers/startUserVerificationEmail";
import addUserAttachmentReducer from "../reducers/addUserAttachment";
import addUserInfoReducer from "../reducers/addUserInfo";
import modifyUserInfoReducer from "../reducers/modifyUserInfo";
import getUserVerificationsReducer from "../reducers/getUserVerifications";
import processVerificationReducer from "../reducers/processVerification";
import getConfigVerificationReducer from "../reducers/getConfigVerification";
import { noAction, decorateResponse } from "../middleware";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const indexStore = createStore(
  indexReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const getUserVerificationFieldsStore = createStore(
  getUserVerificationFieldsReducer,
  storeEnhancers(applyMiddleware(decorateResponse, thunk))
);

export const getUserVerificationMessagesStore = createStore(
  getUserVerificationMessagesReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const startUserVerificationStore = createStore(
  startUserVerificationReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const startUserVerificationEmailStore = createStore(
  startUserVerificationEmailReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const addUserAttachmentStore = createStore(
  addUserAttachmentReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const addUserInfoStore = createStore(
  addUserInfoReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const modifyUserInfoStore = createStore(
  modifyUserInfoReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const getUserVerificationsStore = createStore(
  getUserVerificationsReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const processVerificationStore = createStore(
  processVerificationReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const getConfigVerificationStore = createStore(
  getConfigVerificationReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);
