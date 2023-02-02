//PRINCIPAL
import React, { useEffect, useState, useMemo } from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image,
    StyleSheet,
    Pressable,
    Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import Moment from 'moment';
//import Firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { SliderSound } from './SliderSound';
import RNFetchBlob from 'rn-fetch-blob';
import { compose } from 'redux';
//STORE
import { store as chatStore } from '../../../main/stores/chat';
//HOC
import { withColors, withHmacInterceptor, withNavigation, withRoute, withUserName } from '../../../main/hoc';
import { Avatar } from '@rneui/themed';
import httpRequest from '../../../tools/httpRequest';
import { StackActions } from '@react-navigation/native';
import Video from 'react-native-video';

const mapStateToProps = state => {
    return {
        data: state.data,
    };
};

const ConnectedComponent = ({
    data,
    navigation,
    route,
    colors,
    userName,
    hmacInterceptor
}) => {

    //INITIAL STATES
    const [messagesToDelete, setMessagesToDelete] = useState<string[]>([])

    //EFFECTS
    useEffect(() => {
        console.log('ChatRoomScreen', route.params)
        navigation.setOptions({
            headerLeft: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.dispatch(StackActions.pop())
                        }}
                    >
                        <Ionicons
                            name={'ios-chevron-back-outline'}
                            color={'white'}
                            size={35}
                        />
                    </TouchableOpacity>
                    <Avatar
                        size={35}
                        rounded
                        source={{
                            uri: 'https://service8081.moneyclick.com/attachment/getUserFile/' + route.params.selectedChatRoom.chatRoom,
                            method: 'GET',
                            headers: hmacInterceptor?.process(
                                httpRequest.create(
                                    'https://service8081.moneyclick.com',
                                    '/attachment/getUserFile/' + route.params.selectedChatRoom.chatRoom,
                                    'GET',
                                    null,
                                    false
                                )).headers,
                        }}
                        overlayContainerStyle={{
                            backgroundColor: 'white',
                        }}
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 14,
                            marginLeft: 5
                        }}
                    >
                        {route.params.selectedChatRoom.fullName}
                    </Text>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        marginRight: 10
                    }}
                >
                    {messagesToDelete.length > 0 &&
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    'Delete chat messages',
                                    'Are you sure to delete selected chat messages?',
                                    [
                                        { text: "Cancel", style: 'cancel', onPress: () => { } },
                                        {
                                            text: 'Delete',
                                            style: 'destructive',
                                            // If the user confirmed, then we dispatch the action we blocked earlier
                                            // This will continue the action that had triggered the removal of the screen
                                            onPress: () => {
                                                chatStore.dispatch(
                                                    {
                                                        type: 'DELETE_CHATROOM_MESSAGES',
                                                        payload: {
                                                            chatRoom: route.params.selectedChatRoom.chatRoom,
                                                            timestamps: messagesToDelete
                                                        }
                                                    })
                                                setMessagesToDelete([])
                                            },
                                        },
                                    ]
                                );
                            }}
                            style={{
                                marginRight: 15,
                            }}
                        >
                            <Ionicons
                                name="ios-trash"
                                size={26}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity
                        onPress={() => {
                            const selectedCameraStreamParams = {
                                audioStatus: "on",
                                videoStatus: "on",
                                showCounter: false,
                                callId: null,
                            }
                            navigation.dispatch(StackActions.push('CameraStreamScreen', { ...route.params, selectedCameraStreamParams: selectedCameraStreamParams, replaceTarget: 'ChatRoomScreen' }))
                        }}
                        style={{
                            marginRight: 15,
                        }}
                    >
                        <Ionicons
                            name="ios-videocam"
                            size={26}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            const selectedCameraStreamParams = {
                                audioStatus: "on",
                                videoStatus: "off",
                                showCounter: false,
                                callId: null,
                            }
                            navigation.dispatch(StackActions.push('CameraStreamScreen', { ...route.params, selectedCameraStreamParams: selectedCameraStreamParams, replaceTarget: 'ChatRoomScreen' }))
                        }}
                        style={{
                            marginRight: 15,
                        }}
                    >
                        <Ionicons
                            name="ios-call"
                            size={26}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (chatStore.getState().openModal === 'options') {
                                chatStore.dispatch({
                                    type: 'SET_OPEN_MODAL',
                                    payload: '',
                                });
                            } else {
                                chatStore.dispatch({
                                    type: 'SET_OPEN_MODAL',
                                    payload: 'options',
                                });
                            }
                        }}
                    >
                        <Ionicons
                            name="ios-ellipsis-vertical"
                            size={26}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View >
            ),
            title: ''
        })
    }, [messagesToDelete])

    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            if (messagesToDelete.length === 0) {
                return;
            }
            e.preventDefault();
            setMessagesToDelete([])
        }),
        [navigation, messagesToDelete]
    );

    //MEMOS
    const dataChatRoom = useMemo(() => {
        return data?.find(chatRoom => chatRoom.chatRoom === route?.params?.selectedChatRoom?.chatRoom)?.messages
    }, [data])

    //COMPONENTS
    const renderItem = (item) => (
        <View
            key={item.item.index}
            style={{
                flexDirection: item.item.senderUserName === userName ? 'row-reverse' : 'row',
                padding: 3
            }}
        >
            <Pressable
                onLongPress={() => {
                    if (messagesToDelete.includes(item.item.timestamp)) {
                        setMessagesToDelete(mtd => mtd.filter(it => it !== item.item.timestamp))
                    } else {
                        setMessagesToDelete([...messagesToDelete, item.item.timestamp])
                    }
                }}
                style={{
                    flexDirection: 'column'
                }}
            >
                <View
                    style={
                        item.item.senderUserName === userName ?
                            [{ backgroundColor: colors.secundaryBackground, padding: 5, borderRadius: 5, marginRight: 10 }]
                            :
                            [{ backgroundColor: colors.primaryBackground, padding: 5, borderRadius: 5, marginLeft: 10 }]
                    }
                >
                    {item?.item?.mediaAsset !== undefined && item?.item?.mediaAsset.type.includes('image') &&
                        <Image
                            source={{
                                uri: item.item.mediaAsset.uri,
                                width: 120,
                                height: 120
                            }}
                            style={{
                                alignSelf: 'center'
                            }}
                        />}
                    {item?.item?.mediaAsset !== undefined && item?.item?.mediaAsset.type.includes('video') &&
                        <Video
                            source={{
                                uri: item.item.mediaAsset.uri,
                            }}
                            paused={true}
                            controls={true}
                            resizeMode='cover'
                            onError={(error) => {
                                //console.log('>>>>>>>>>>>>> ' + JSON.stringify(error))
                            }}
                            style={{
                                height: 150,
                                width: 150,
                                alignSelf: 'center'
                            }}
                        />}
                    {item.item.text.trim() !== '' &&
                        <Text
                            style={[styles.txtMessage, { color: colors.text }]}
                        >
                            {item.item.text.trim()}
                        </Text>}
                    <View style={styles.viewDateAndStatusMessage}>
                        <Text
                            style={[styles.txtDateOwn, { color: colors.text }]}
                        >
                            {Moment(new Date(item.item.timestamp)).format(
                                'MMM. DD YYYY hh:mm a'
                            )}
                        </Text>
                        {item.item.senderUserName === userName && (item.item.sended || item.item.delivered)
                            ?
                            <>
                                <MaterialCommunityIcons
                                    name={'check'}
                                    color={item.item.readed ? '#1f65ff' : 'silver'}
                                    size={14}
                                />
                                {item.item.delivered &&
                                    <MaterialCommunityIcons
                                        style={{
                                            marginLeft: -9
                                        }}
                                        name={'check'}
                                        color={item.item.readed ? '#1f65ff' : 'silver'}
                                        size={14}
                                    />}
                            </>
                            :
                            item.item.senderUserName === userName &&
                            <MaterialCommunityIcons
                                name={'clock-time-three-outline'}
                                color={'silver'}
                                size={14}
                            />}
                    </View>
                </View>
            </Pressable>
        </View>
    )

    //PRINCIPAL RENDER
    return (
        <>
            <FlatList
                style={{
                    backgroundColor: colors.background,
                    flex: 3
                }}
                data={dataChatRoom}
                renderItem={renderItem}
                keyExtractor={item => String(item.timestamp)}
                removeClippedSubviews={true}
                maxToRenderPerBatch={20}
                windowSize={21}
                initialNumToRender={50}
                inverted={true}
            />
        </>
    )
};

export default React.memo(compose(withNavigation, withRoute, withColors, withUserName, withHmacInterceptor, connect(mapStateToProps))(ConnectedComponent));

const styles = StyleSheet.create({
    cardOwn: {
        borderRadius: 5,
        minHeight: 40,
        flexDirection: 'column-reverse',
        backgroundColor: '#009387',
        marginRight: 20,
        padding: 5
    },
    cardThird: {
        borderRadius: 5,
        minHeight: 40,
        backgroundColor: '#e0e1f0',
        flexDirection: 'column',
        marginLeft: 20,
    },
    viewDateAndStatusMessage: {
        paddingTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    txtDateOwn: {
        fontSize: 9,
        textAlign: 'right',
        marginRight: 5,
    },
    txtDateThirds: {
        paddingTop: 5,
        fontSize: 9,
        textAlign: 'right'
    },
    image: {
        width: 250,
        height: 190
    },
    imageReply: {
        width: 50,
        height: 40
    },
    video: {
        height: 200,
        width: 250
    },
    videoReply: {
        height: 50,
        width: 60
    },
    txtMessage: {
        marginRight: 10,
        fontSize: 14,
        textAlign: 'justify',
        maxWidth: Dimensions.get('window').width * 0.7,
    }
});
