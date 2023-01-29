//STORES
import {
    authPersistedStore as authStore
} from '../../../main/store'
import {
    indexPersistedStore
} from '../store'
import {
    headersStore
} from '../../../main/store';
import httpRequest from '../../../tools/httpRequest';

//FUNCTIONS
import RNFetchBlob from 'rn-fetch-blob';
const { config, fs } = RNFetchBlob;
//ACTIONS
import {
    ADD_CHAT_DATA,
    UPDATE_CHAT_REFRESH_COUNT,
} from '../../../constants/action-types'

export var ws = null;

export const start = () => {
    if (ws !== null) {
        return;
    }
    ws = new WebSocket('wss://websocket.moneyclick.com/mcUser')
    ws.onopen = (e) => {
        console.log('Open!')
        let params = {
            userName: authStore.getState().userNameState,
        }
        ws.send(JSON.stringify({
            method: 'getMessagesNew',
            params: params
        }))
    }
    ws.onmessage = ({ data }) => {
        let dataParsed = JSON.parse(data)
        let chatRooms = dataParsed.params.data;
        var chatDataSingleton = chatSingleton.getInstance()
        Object.entries(chatRooms).forEach(([key, value]) => {
            value = value.sort((a, b) => {
                if (a.timestamp < b.timestamp) return -1;
                if (a.timestamp > b.timestamp) return 1;
                return 0;
            });
            Object.entries(value).forEach(([k, v]) => {
                chatDataSingleton.add(key, v);
                //new Promise(resolve => setTimeout(resolve, 200))
            })
        })
    }
    ws.onerror = (e) => {
        console.log('error ' + JSON.stringify(e))
    }
    ws.onclose = (e) => {
        console.log('close')
    }
}

export const close = (ws) => {
    ws.close()
    ws = null
}

const chatSingleton = (() => {
    // Instance stores a reference to the Singleton
    var instance;
    const init = () => {
        // Singleton  
        // Private methods and variables
        /*const privateMethod = () => {
            console.log("I am private");
        }*/
        var data = [];
        return {
            // Public methods and variables
            add: (chatRoom, message) => {
                let data = {
                    chatRoom: chatRoom,
                    message: message,
                }
                if (data.chatRoom === authStore.getState().userNameState) {
                    console.log('CASO A RESOLVER')
                } else {
                    console.log('DATA SOCKET ', data.message);
                    if (data.message.attachmentFileName !== undefined && data.message.attachmentFileName !== null) {
                        validateMessage(data);
                    } else {
                        indexPersistedStore.dispatch(
                            { type: ADD_CHAT_DATA, payload: data }
                        )
                        setTimeout(() => {
                            indexPersistedStore.dispatch(
                                { type: UPDATE_CHAT_REFRESH_COUNT }
                            )
                        }, 0);
                    }
                }
            },
        };
    };
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: () => {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();



function validateMessage(item) {
    RNFetchBlob.fs.exists(RNFetchBlob.fs.dirs.PicturesDirectoryPath + '/' + item.message.attachmentFileName).then(exist => {
        if (!exist) {
            console.log('ext ', item.message.attachmentFileName.split('.')[1]);
            const optionsVideo = {
                fileCache: true,
                appendExt: item.message.attachmentFileName.split('.')[1],
            }
            const requestMedia = config(optionsVideo);
            let imagePath;
            requestMedia.fetch('GET',
                getURI(item.message.senderUserName, item.message.receiverUserName, item.message.attachmentFileName),
                getHeaders(item.message.senderUserName, item.message.receiverUserName, item.message.attachmentFileName))
                .then(resp => {
                    imagePath = resp.path();
                    item.message.uri = imagePath;
                    indexPersistedStore.dispatch(
                        { type: ADD_CHAT_DATA, payload: item }
                    )
                    setTimeout(() => {
                        indexPersistedStore.dispatch(
                            { type: UPDATE_CHAT_REFRESH_COUNT }
                        )
                    }, 0);
                });

        } else {
            indexPersistedStore.dispatch(
                { type: ADD_CHAT_DATA, payload: item }
            )
            setTimeout(() => {
                indexPersistedStore.dispatch(
                    { type: UPDATE_CHAT_REFRESH_COUNT }
                )
            }, 0);
        }
    });
};

function getURI(senderUserName, receiverUserName, attachmentFileName) {
    return 'https://service8081.moneyclick.com/mcUser/getMessageAttachment/'
        + senderUserName + '/' + receiverUserName + '/' + attachmentFileName
}

function getHeaders(senderUserName, receiverUserName, attachmentFileName) {
    return headersStore.getState().hmacInterceptorState.process(
        httpRequest.create(
            'https://service8081.moneyclick.com',
            '/mcUser/getMessageAttachment/' + senderUserName
            + '/' + receiverUserName + '/' + attachmentFileName,
            'GET',
            null,
            false
        )).headers;
}
