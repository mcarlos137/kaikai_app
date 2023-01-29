//PRINCIPAL
import React from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Avatar, Badge } from '@rneui/themed';
import { connect } from "react-redux";
import Moment from 'moment';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
//TOOLS
import httpRequest from '../../../tools/httpRequest';
//STORES
import {
    headersStore,
} from '../../../main/store';
import {
    authPersistedStore as authStore
} from '../../../main/store'
import {
    navigateStore,
} from '../../../main/store'
import {
    indexPersistedStore,
} from '../store'
//ACTIONS
import {
    NAVIGATE, SET_NAME_DELETE_CHAT, VIEW_DELETE_CHAT, SET_CHAT_ROOM_TO_DELETE
} from '../../../constants/action-types';

const keyExtractor = (item) => (
    String(item.chatRoom)
)

const renderItem = (item, colors) => (
    <>
        {item.item.messages.length > 0 &&
            <TouchableOpacity
                onPress={() => {
                    let selectedChatRoom = {
                        chatRoom: item.item.chatRoom,
                    }
                    if (item.item.nickName !== undefined) {
                        selectedChatRoom.nickName = item.item.nickName
                    }
                    if (item.item.firstName !== undefined) {
                        selectedChatRoom.firstName = item.item.firstName
                    }
                    if (item.item.lastName !== undefined) {
                        selectedChatRoom.lastName = item.item.lastName
                    }
                    if (item.item.contactFullName !== undefined) {
                        selectedChatRoom.contactFullName = item.item.contactFullName
                    }
                    if (item.item.publicKey !== undefined) {
                        selectedChatRoom.publicKey = item.item.publicKey
                    }
                    if (item.item.privateKey !== undefined) {
                        selectedChatRoom.privateKey = item.item.privateKey
                    }
                    if (item.item.otherPublicKey !== undefined) {
                        selectedChatRoom.otherPublicKey = item.item.otherPublicKey
                    }
                    navigateStore.dispatch({
                        type: NAVIGATE,
                        payload: {
                            target: 'ChatRoomScreen',
                            selectedChatRoom: selectedChatRoom,
                            selectedPhone: {}
                        }
                    })
                }}
                onLongPress={() => {
                    indexPersistedStore.dispatch({
                        type: SET_CHAT_ROOM_TO_DELETE,
                        payload: item.item.chatRoom
                    });
                    indexPersistedStore.dispatch({
                        type: SET_NAME_DELETE_CHAT,
                        payload: getName(item)
                    });
                    indexPersistedStore.dispatch({
                        type: VIEW_DELETE_CHAT,
                        payload: true
                    });
                }}
                style={{
                    marginLeft: 10,
                    marginTop: 10,
                    marginRight: 10,
                    borderRadius: 10,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colors.primaryBackground,
                    flexDirection: 'row',
                }}
            >
                <Avatar
                    rounded
                    size={50}
                    source={{
                        uri: 'https://service8081.moneyclick.com/attachment/getUserFile/' + item.item.chatRoom.split('__')[0],
                        method: 'GET',
                        headers: headersStore.getState().hmacInterceptorState.process(
                            httpRequest.create(
                                'https://service8081.moneyclick.com',
                                '/attachment/getUserFile/' + item.item.chatRoom.split('__')[0],
                                'GET',
                                null,
                                false
                            )).headers,
                    }}
                    overlayContainerStyle={{
                        backgroundColor: 'white',
                    }}
                />
                <View
                    style={{
                        flex: 4.5,
                        marginLeft: 15,
                        flexDirection: 'column'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                flex: 1,
                                color: colors.text,
                                fontWeight: 'bold',
                                fontSize: 16
                            }}
                        >
                            {getName(item)} {item.item.chatRoom.includes('ADMIN__') ? ' --> ' + item.item.chatRoom.split('__')[1].substring(item.item.chatRoom.split('__')[1].length - 4) : undefined}
                        </Text>
                        <Text
                            style={{
                                color: colors.text,
                                fontWeight: 'bold',
                                fontSize: 11,
                                alignSelf: 'center',
                            }}
                        >
                            {Moment(new Date(Number(item.item.messages[0].time)).toISOString()).format(
                                'hh:mm a'
                            )}
                        </Text>
                    </View>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 14,
                        }}
                    >
                        {getTextLastMessage(item)}
                    </Text>
                </View>
                {item.item.notRead > 0 && <View style={{ alignSelf: 'center', padding: 5 }}><Badge size={"small"} value={item.item.notRead} status="primary" /></View>}
            </TouchableOpacity>}
    </>
)

const getItemLayout = (data, index) => ({
    length: data.length,
    offset: data.length * index,
    index,
})

const mapStateToProps = state => {
    return {
        dataState: state.dataState,
        updateRefreshCountState: state.updateRefreshCountState,
    };
};

const ConnectedComponent = ({
    dataState,
    updateRefreshCountState,
}) => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, }}>
            <FlatList
                data={dataState}
                renderItem={(item) => renderItem(item, colors)}
                keyExtractor={keyExtractor}
                removeClippedSubviews={true}
                maxToRenderPerBatch={20}
                windowSize={21}
                initialNumToRender={20}
                extraData={updateRefreshCountState}
                //getItemLayout={getItemLayout}
                updateCellsBatchingPeriod={50}
            />
            <TouchableOpacity
                onPress={() => {
                    navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'ContactsScreen', redirectToTarget: 'ChatRoomScreen', selectedStatusBarColor: '#1f65ff' } });
                }}
                style={{
                    position: 'absolute',
                    right: 30,
                    bottom: 60,
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: '#009387',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <IconMaterialCommunity
                    name="message-text-outline"
                    color={'white'}
                    size={40}
                />
            </TouchableOpacity>
        </View>
    )
};

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;

function getTextLastMessage(item) {
    let text = '';
    let notRead = 0;
    for (let i = 0; i < item.item.messages.length; i++) {
        if (item.item.messages[i].deleted === undefined || !item.item.messages[i].deleted) {
            if (text === '') {
                if (item.item.messages[i].message.length > 38) {
                    text = item.item.messages[i].message.trim().slice(0, 35) + '...';
                } else {
                    text = item.item.messages[i].message.trim()
                }
            }
            if (item.item.messages[i].senderUserName !== authStore.getState().userNameState && item.item.messages[i].readed === false) {
                notRead = notRead + 1;
            }
        }
    }
    item.item.notRead = notRead;
    //console.log('msjnoleidos',item.item.notRead);
    return text;
}

function getName(item) {
    return item.item.firstName === undefined || item.item.lastName === undefined
        ?
        item.item.contactFullName === undefined
            ?
            item.item.nickName === undefined
                ?
                item.item.chatRoom
                :
                item.item.nickName
            :
            item.item.contactFullName
        :
        item.item.firstName + ' ' + item.item.lastName;
}
