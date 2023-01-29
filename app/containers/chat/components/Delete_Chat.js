//PRINCIPAL
import React from 'react';
import {
    StyleSheet,
    Text, 
    View,
    Dimensions
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import {
   authPersistedStore as authStore,
} from '../../../main/store';
import { connect } from "react-redux";
//TOOLS
//STORES
import {
    deleteMessagesStore
} from '../../chatRoom/store'
import {
    indexPersistedStore
} from '../store'
//ACTIONS
import {deleteAllMessageAction} from '../../chatRoom/actions/index';
import {
    REMOVE_ALL_CHAT_DATA,
    REMOVE_ALL_CHAT_DATA_RECEIVER_TOO,
    UPDATE_CHAT_REFRESH_COUNT,
    VIEW_DELETE_CHAT
} from '../../../constants/action-types';

import { TouchableOpacity } from 'react-native-gesture-handler';



const mapStateToProps = state => {
    return {
        replyState: state.replyState,
        viewDeleteChatState: state.viewDeleteChatState,
        nameDeleteChatState: state.nameDeleteChatState,
        chatRoomToDeleteState: state.chatRoomToDeleteState,
        deleteMessagesToReceiverToo: state.deleteMessagesToReceiverToo
    };
};

const ConnectedComponent = ({
    viewDeleteChatState,
    nameDeleteChatState,
    chatRoomToDeleteState,
    deleteMessagesToReceiverToo
}) => (viewDeleteChatState &&
    <View
      style={{
        left:  Dimensions.get('window').width * 0.1,
        top:  -Dimensions.get('window').width * 0.9,
        backgroundColor: "#009387",
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.8,
      }}>
      <Text style={{padding: 16, fontSize: 18, color: 'white'}}>Delete Message</Text>
       <Text style={{paddingLeft: 16, fontSize: 16, color: 'white', paddingBottom: 16}}>{'Are you sure you want to delete chat with '+ nameDeleteChatState + ' ?'} </Text>
       <CheckBox
            onPress={() => {
                let dispatchBody = {
                    type: REMOVE_ALL_CHAT_DATA_RECEIVER_TOO, 
                    payload: !deleteMessagesToReceiverToo
                }
                indexPersistedStore.dispatch(dispatchBody);
              
                }}
                containerStyle={{backgroundColor: '#009387', borderColor: '#009387'}}
                textStyle={{color:'white'}}
                style={{marginTop: 5}}
                    title={'Delete for '+ nameDeleteChatState}
                            checked={deleteMessagesToReceiverToo}
                            checkedColor='#694fad'
                            uncheckedColor='#694fad'
                        />
       <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginEnd:20, paddingBottom: 10}}>
              <TouchableOpacity
              style={{marginRight: 15}}
                    onPress={() => {
                          indexPersistedStore.dispatch({
                             type: VIEW_DELETE_CHAT, payload: false})
            }}>
                         <Text style={{color: 'white'}}>CANCEL</Text>
                    </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                        if(deleteMessagesToReceiverToo) {
                            //console.log('deleteMessagesStore server');
                             deleteMessagesStore.dispatch(deleteAllMessageAction(authStore.getState().userNameState,chatRoomToDeleteState));
                        /* indexPersistedStore.dispatch({
                             type: REMOVE_ALL_CHAT_DATA, payload: chatRoomToDeleteState})*/
                            }else{
                              //console.log('REMOVE_ALL_CHAT_DATA local');
                            indexPersistedStore.dispatch({
                             type: REMOVE_ALL_CHAT_DATA, payload: chatRoomToDeleteState})
                        }
                       
                        
                        setTimeout(() => {
                            indexPersistedStore.dispatch(
                                { type: UPDATE_CHAT_REFRESH_COUNT }
                        )
                    }, 0);
                       indexPersistedStore.dispatch({
                             type: VIEW_DELETE_CHAT, payload: false})

             }}>
                         <Text style={{color: 'white'}}>OK</Text>
                    </TouchableOpacity>
                  
       </View>
    </View>);
const Component = connect(mapStateToProps, null, null)(ConnectedComponent);

export default Component;

const styles = StyleSheet.create({
    iconStyle: {
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    textOption: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white',
        paddingLeft: 15
    }
});