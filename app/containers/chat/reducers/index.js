//ACTIONS
import {
  SET_CHAT_DATA,
  ADD_CHAT_DATA,
  SET_CHAT_KEY_PAIR,
  SET_CHAT_OTHER_PUBLIC_KEY,
  SET_CHAT_SELECTED_CHAT_ROOM,
  SET_CHAT_NEW_MESSAGE,
  SET_IMAGE_EMOJIS_CHANGE,
  ADD_CHAT_UNSENDED_DATA,
  REMOVE_CHAT_UNSENDED_DATA,
  UPDATE_CHAT_REFRESH_COUNT,
  OPEN_MODAL,
  REMOVE_CHAT_DATA,
  VIEW_DELETE_CHAT,
  SET_NAME_DELETE_CHAT,
  SET_CHAT_ROOM_TO_DELETE,
  REMOVE_ALL_CHAT_DATA,
  REMOVE_ALL_CHAT_DATA_RECEIVER_TOO,
  CHANGE_CHAT_MESSAGE_STATUS,
  ADD_CHAT_DATA_NEW,
} from "../../../constants/action-types";

const initialState = {
  dataState: [],
  updateRefreshCountState: 0,
  selectedChatRoomState: {},
  unsendedDataState: [],
  openModalState: false,
  unassignedKeyPair: {},
  viewDeleteChatState: false,
  nameDeleteChatState: '',
  chatRoomToDeleteState: '',
  deleteMessagesToReceiverToo: false
};

function rootReducer(state = initialState, action) {
  if (action.type === REMOVE_ALL_CHAT_DATA_RECEIVER_TOO) {
    return Object.assign({}, state, {
      token: state.deleteMessagesToReceiverToo = !state.deleteMessagesToReceiverToo,
    });
  }
  if (action.type === SET_CHAT_ROOM_TO_DELETE) {
    return Object.assign({}, state, {
      token: state.chatRoomToDeleteState = action.payload,
    });
  }
  if (action.type === SET_NAME_DELETE_CHAT) {
    return Object.assign({}, state, {
      token: state.nameDeleteChatState = action.payload,
    });
  }
  if (action.type === VIEW_DELETE_CHAT) {
    return Object.assign({}, state, {
      token: state.viewDeleteChatState = action.payload,
    });
  }
  if (action.type === OPEN_MODAL) {
    return Object.assign({}, state, {
      token: state.openModalState = action.payload,
    });
  }
  
  return state;
}

export default rootReducer;

