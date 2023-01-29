import { createStore, applyMiddleware, compose } from "redux";
import indexReducer from "../reducers";
import getNotificationsReducer from "../reducers/getNotifications";
import sendMessageReducer from "../reducers/sendMessage";
import { noAction, decorateResponse } from "../middleware";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const indexStore = createStore(
  indexReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);

export const getNotificationsStore = createStore(
  getNotificationsReducer,
  storeEnhancers(applyMiddleware(decorateResponse, thunk))
);

export const sendMessageStore = createStore(
  sendMessageReducer,
  storeEnhancers(applyMiddleware(noAction, thunk))
);
