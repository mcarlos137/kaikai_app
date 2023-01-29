const initialState: any = {
    data: [],
    refreshCount: 0,
    selectedChatRoom: {},
    unsendedData: [],
    openModal: false,
    unassignedKeyPair: {},
};

function reducer(state = initialState, action) {
    if (action.type === 'UPDATE_REFRESH_COUNT') {
        return Object.assign({}, state, {
            token: state.refreshCount = state.refreshCount + 1
        });
    }
    if (action.type === 'CHANGE_MESSAGE_STATUS') {
        let data = state.data.slice(0);
        data.find((item) => {
            if (item.chatRoom === action.payload.receiverUserName) {
                Object.entries(item.messages).every(function (element: any, index) {
                    if (Number(element[1].time) === Number(action.payload.id)) {
                        if (action.payload.status === 'sended') {
                            element[1].sended = true
                        }
                        if (action.payload.status === 'delivered') {
                            element[1].delivered = true
                        }
                        if (action.payload.status === 'readed') {
                            element[1].readed = true
                        }
                        return false;
                    } else {
                        return true;
                    }
                })
            }
        });
        return Object.assign({}, state, {
            token: state.data = data
        });
    }
    if (action.type === 'ADD_NEW_DATA') {
        let data = state.data.slice(0);
        let added = false
        Object.entries(data).every(function (element: any, index) {
            if (element[1].chatRoom === action.payload.chatRoom) {
                element[1].messages.unshift(action.payload.message)
                added = true
                return false;
            }
            return true
        });
        if (!added) {
            var newMessage: any = { chatRoom: action.payload.chatRoom, messages: [action.payload.message] }
            if (action.payload.publicKey !== undefined) {
                newMessage.publicKey = action.payload.publicKey
            }
            if (action.payload.otherPublicKey !== undefined) {
                newMessage.otherPublicKey = action.payload.otherPublicKey
            }
            if (action.payload.firstName !== undefined) {
                newMessage.firstName = action.payload.firstName
            }
            if (action.payload.lastName !== undefined) {
                newMessage.lastName = action.payload.lastName
            }
            if (action.payload.contactFullName !== undefined) {
                newMessage.contactFullName = action.payload.contactFullName
            }
            if (action.payload.nickName !== undefined) {
                newMessage.nickName = action.payload.nickName
            }
            data.push(newMessage);
        }
        /*if (action.payload.message.publicKey !== undefined && action.payload.message.senderUserName === action.payload.message.chatRoom) {
          data.find((item) => {
            if (item.chatRoom === action.payload.chatRoom) {
              item.otherPublicKey = action.payload.message.publicKey
            }
          });
        }*/
        return Object.assign({}, state, {
            token: state.data = data
        });
    }
    if (action.type === 'REMOVE_UNSENDED_DATA') {
        let index = state.unsendedData.indexOf(action.payload);
        if (index > -1) {
            state.unsendedData.splice(index, 1);
        }
    }
    if (action.type === 'ADD_UNSENDED_DATA') {
        state.unsendedData.push(action.payload)
    }
    if (action.type === 'SET_SELECTED_CHAT_ROOM') {
        let data = state.data.slice(0);
        data.find((item) => {
            if (item.chatRoom === action.payload) {
                item.messages.array.forEach(element => {
                    element.readed = true;
                });
                return true;
            }
        });
        return Object.assign({}, state, {
            token: state.data = data,
            token1: state.selectedChatRoom = action.payload
        });
    }
    if (action.type === 'SET_OTHER_PUBLIC_KEY') {
        let data = state.data.slice(0);
        data.find((item) => {
            if (item.chatRoom === action.payload) {
                let otherPublicKey = ''
                Object.entries(item.messages).every(function (element: any, index) {
                    if (element[1].senderUserName === action.payload && element[1].publicKey !== null) {
                        otherPublicKey = element[1].publicKey;
                        return false;
                    } else {
                        return true;
                    }
                })
                item.otherPublicKey = otherPublicKey;
            }
        });
        return Object.assign({}, state, {
            token: state.data = data,
        });
    }
    if (action.type === 'SET_KEY_PAIR') {
        let data = state.data.slice(0);
        console.log('keyPair>>>>>>> ' + JSON.stringify(action.payload.keyPair))
        let added = false
        data.find((item) => {
            if (item.chatRoom === action.payload.chatRoom.chatRoom) {
                item.publicKey = action.payload.keyPair.publicKey;
                item.privateKey = action.payload.keyPair.privateKey;
                added = true
            }
        });
        if (!added) {
            let newChatRoom = action.payload.chatRoom
            newChatRoom.publicKey = action.payload.keyPair.publicKey;
            newChatRoom.privateKey = action.payload.keyPair.privateKey;
            if (newChatRoom.messages === undefined) {
                newChatRoom.messages = []
            }
            data.push(newChatRoom);
        }
        return Object.assign({}, state, {
            token: state.data = data,
        });
    }
    if (action.type === 'REMOVE_ALL_DATA') {
        let data = state.data.slice(0);
        data.find((item) => {
            if (item.chatRoom === action.payload) {
                item.messages = [];
                return true;
            }
        });
        return Object.assign({}, state, {
            token: state.data = data
        });
    }
    if (action.type === 'REMOVE_DATA') {
        let data = state.data.slice(0);
        let index;
        data.find((item) => {
            if (item.chatRoom === state.selectedChatRoom.chatRoom) {
                index = item.messages.findIndex(i => i.time === action.payload.time);
                item.messages.splice(index, 1);
                return true;
            }
        });
        return Object.assign({}, state, {
            token: state.data = data
        });
    }
    if (action.type === 'ADD_DATA') {
        //console.log('ADD_CHAT_DATA ',action.payload );
        let data = state.data.slice(0);
        let reply = null;
        if (action.payload.chatRoom !== undefined && action.payload.message !== undefined) {
            let added = data.find((item) => {
                if (item.chatRoom === action.payload.chatRoom) {
                    let founded = foundMsg(item, action, reply);
                    if (!founded) {
                        item.messages.unshift(action.payload.message)
                    }
                    return true;
                }
                return false;
            });
            if (!added) {
                var newMessage: any = { chatRoom: action.payload.chatRoom, messages: [action.payload.message] }
                console.log('notadd ', action.payload);
                if (action.payload.firstName !== undefined) {
                    newMessage.firstName = action.payload.firstName
                }
                if (action.payload.lastName !== undefined) {
                    newMessage.lastName = action.payload.lastName
                }
                if (action.payload.contactFullName !== undefined) {
                    newMessage.contactFullName = action.payload.contactFullName
                }
                if (action.payload.nickName !== undefined) {
                    newMessage.nickName = action.payload.nickName
                }
                data.push(newMessage);
            }
            if (action.payload.message.publicKey !== undefined && action.payload.message.senderUserName === action.payload.message.chatRoom) {
                data.find((item) => {
                    if (item.chatRoom === action.payload.chatRoom) {
                        item.otherPublicKey = action.payload.message.publicKey
                    }
                });
            }

            return Object.assign({}, state, {
                token: state.data = data
            });

        }
    }
    if (action.type === 'SET_DATA') {
        return Object.assign({}, state, {
            token: state.data = action.payload,
        });
    }
    return state;
}

export default reducer;

function foundMsg(item, action, reply) {
    return item.messages.find((i) => {
        if (i.time == action.payload.message.time) {
            i.sended = true;
            i.delivered = action.payload.message.delivered;
            i.readed = action.payload.message.readed;
            i.deleted = action.payload.message.deleted !== undefined && action.payload.message.deleted
            if (action.payload.message.attachmentFileName !== undefined) {
                i.attachmentFileName = action.payload.message.attachmentFileName;
            }
            if (action.payload.message.uri !== undefined) {
                i.uri = action.payload.message.uri;
            }
            return true;
        }
        return false;
    });
}