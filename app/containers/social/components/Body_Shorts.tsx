import React, { useRef, useState } from 'react';
import {
    View,
    Dimensions,
    Text,
    ScrollView,
    Button,
    TouchableOpacity,
    Platform,
    FlatList,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { connect } from "react-redux";
import { Avatar } from '@rneui/themed';
import Share from "react-native-share";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';
import { compose } from 'redux';
//STORES
import { store as shortsStore } from '../../../main/stores/shorts';
//TOOLS
import httpRequest from '../../../tools/httpRequest';
//HOC
import { withColors, withConfig, withHmacInterceptor, withNavigation, withRoute, withUserName } from '../../../main/hoc';
import { StackActions } from '@react-navigation/native';

const mapStateToProps = state => {
    return {
        data: state.data,
        unprocessedData: state.unprocessedData
        //shortsUsableWindowHeightState: state.shortsUsableWindowHeightState,
    };
};

const ConnectedComponent = ({
    selectedTab,
    data,
    unprocessedData,
    //shortsUsableWindowHeightState,
    navigation,
    route,
    colors,
    userName,
    config,
    hmacInterceptor
}) => {

    //INITIAL STATES
    const [visibleIndex, setVisibleIndex] = useState(-1)
    const [paused, setPaused] = useState(false)
    const flatListRef = useRef<any>()
    const PLAYERS = [
        useRef<any>(),
        useRef<any>(),
        useRef<any>(),
        useRef<any>(),
        useRef<any>(),
        useRef<any>(),
        useRef<any>(),
        useRef<any>(),
        useRef<any>(),
        useRef<any>()
    ]
    const selectedPlayer = useRef<any>()

    //COMPONENTS
    const renderItem = (item, visibleIndex, maxIndex, shortsUsableWindowHeight: 400) => (
        <View
            style={{
                height: shortsUsableWindowHeight,
            }}
        >
            <Video
                ref={(ref) => { PLAYERS[item.index].current = ref; }}
                source={{ uri: item.item.uri }}
                rate={1.0}
                //volume={0.0}
                //muted={false}
                repeat={false}
                paused={(item.index === visibleIndex && !paused) ? false : true}
                onLoadStart={() => {
                    flatListRef?.current?.scrollToIndex({ animated: true, index: visibleIndex });
                }}
                //controls={item.index === visibleIndex ? true : false}
                onEnd={() => {
                    let newIndex = item.index + 1
                    if (newIndex <= maxIndex) {
                        flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
                    }
                }}
                onProgress={(data) => {
                    //sliderStore.dispatch({ type: SET_SLIDER_VALUE, payload: data.currentTime })
                    if (Number(data.currentTime) > 5 && Number(data.currentTime) < 5.2 && (item.item.viewed === undefined || (new Date(item.item.viewed).getTime() + 30 * 60 * 1000) < new Date().getTime())) {
                        let shortsName = config.nickName
                        if (config.firstName !== undefined &&
                            config.lastName !== undefined) {
                            shortsName = config.firstName + ' ' + config.lastName
                        }
                        /*shortsViewStore.dispatch(
                            shortsViewAction(
                                item.item.id,
                                authPersistedStore.getState().userNameState,
                                shortsName
                            )
                        )*/
                        //shortsPersistedStore.dispatch({ type: CHANGE_SOCIAL_SHORTS_DATA_VALUE, payload: { id: item.item.id, key: 'addToViewsCount' } })    
                    }
                }}
                onLoad={(data) => {
                    //sliderStore.dispatch({ type: SET_SLIDER_MAXIMUM_VALUE, payload: data.duration })
                }}
                onError={(error) => {
                    RNFetchBlob.config({
                        fileCache: true,
                        appendExt: 'mp4',
                    })
                        .fetch('GET', 'https://service8081.moneyclick.com/shorts/getAttachment/' + item.item.videoFileName)
                        .then(res => {
                            item.item.uri = (Platform.OS === 'android') ? 'file://' + res.path() : res.path()
                            //shortsPersistedStore.dispatch({ type: CHANGE_SOCIAL_SHORTS_DATA_VALUE, payload: { id: item.item.id, key: 'uri', value: item.item.uri } })
                        });
                }}
                resizeMode={"stretch"}
                bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 50000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
            />
            <View
                style={{
                    //marginTop: screenStore.getState().headerHeightState,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        //height: shortsUsableWindowHeight - screenStore.getState().headerHeightState - screenStore.getState().footerHeightState - 22 - getPlatformHeightCorrection('SOCIAL_SHORTS'),
                        padding: 10,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            flex: 0.15
                        }}
                    >
                    </View>
                    <View
                        style={{
                            flex: 0.7,
                            alignItems: 'center',
                            alignSelf: 'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setPaused(value => !value)
                            }}
                            style={{
                                height: 500,
                                width: 200,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {paused &&
                                <MaterialCommunityIcons
                                    name={'play'}
                                    color={'white'}
                                    size={60}
                                />}
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            flex: 0.15,
                            paddingTop: 5,
                            paddingBottom: 5,
                        }}
                    >
                        <MaterialCommunityIcons
                            name={'eye'}
                            color={'white'}
                            size={30}
                        />
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 10
                            }}
                        >
                            {item.item.viewsCount}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                /*shortsReactStore.dispatch(
                                    shortsReactAction(
                                        item.item.id,
                                        item.item.userName,
                                        item.item.name,
                                        'LIKES_MAIN'
                                    )
                                )
                                shortsPersistedStore.dispatch({ type: CHANGE_SOCIAL_SHORTS_DATA_VALUE, payload: { id: item.item.id, key: 'liked', value: true } })
                                shortsPersistedStore.dispatch({ type: CHANGE_SOCIAL_SHORTS_DATA_VALUE, payload: { id: item.item.id, key: 'addToReactionsCount__LIKES_MAIN' } })
                                console.log('>>>>>>>>>>>> like main')
                                console.log('>>>>>>>>>>>> ' + item.item.id)
                                console.log('>>>>>>>>>>>> ' + item.item.userName)
                                console.log('>>>>>>>>>>>> ' + item.item.name)
                                console.log('>>>>>>>>>>>> ' + 'LIKES_MAIN')*/
                            }}
                            style={{
                                marginTop: 13
                            }}
                        >
                            <MaterialCommunityIcons
                                name={item.item.liked ? 'heart' : 'heart-outline'}
                                color={'white'}
                                size={30}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 10
                            }}
                        >
                            {item.item.reactionsCount.LIKES_MAIN !== undefined ? item.item.reactionsCount.LIKES_MAIN : 0}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                //navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'ShortsCommentsScreen', selectedShorts: item.item } })
                            }}
                            style={{
                                marginTop: 15
                            }}
                        >
                            <MaterialCommunityIcons
                                name={'comment'}
                                color={'white'}
                                size={30}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 10
                            }}
                        >
                            {item.item.commentsCount}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                const options = {
                                    title: 'Share via',
                                    message: 'some message',
                                    url: 'some share url',
                                    //social: Share.Social.WHATSAPP,
                                    //whatsAppNumber: "9199999999",  // country code + phone number
                                    //filename: 'test' , // only for base64 file in Android
                                };
                                Share.open(options)
                                    .then((response) => {
                                        console.log({ response });
                                        /*shortsShareStore.dispatch(
                                            shortsShareAction(
                                                item.item.id,
                                                item.item.userName,
                                                item.item.name
                                            )
                                        )*/
                                        console.log('>>>>>>>>>>>> share')
                                    })
                                    .catch((error) => {
                                        console.log({ error });
                                    });
                            }}
                            style={{
                                marginTop: 10
                            }}
                        >
                            <MaterialCommunityIcons
                                name={'share'}
                                color={'white'}
                                size={30}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 10
                            }}
                        >
                            {item.item.sharesCount}
                        </Text>
                        {userName !== item.item.userName &&
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.dispatch(StackActions.push('DonationSendScreen', { ...route.params, selectedDonationTarget: { userName: item.item.userName, name: item.item.name, contentType: 'SHORTS', contentId: item.item.id } }))
                                }}
                                style={{
                                    marginTop: 15
                                }}
                            >
                                <MaterialCommunityIcons
                                    name={'hand-coin'}
                                    color={'white'}
                                    size={30}
                                />
                            </TouchableOpacity>}
                        {userName !== item.item.userName &&
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 10
                                }}
                            >
                                {item.item.donationsAmountUSD} {'$'}
                            </Text>}
                        {userName !== item.item.userName &&
                            <>
                                <TouchableOpacity
                                    disabled={!item.item.allowMoneyCalls}
                                    onPress={() => {
                                        let selectedMoneyCallUserOther = {
                                            userName: item.item.userName,
                                            name: item.item.name,
                                            basicRate: item.item.moneyCallRate
                                        }
                                        navigation.dispatch(StackActions.push('MoneyCallsCreateScreen', { ...route.params, selectedMoneyCallOverviewUser: selectedMoneyCallUserOther }))
                                    }}
                                    style={{
                                        marginTop: 20
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name={item.item.allowMoneyCalls ? 'cellphone' : 'cellphone-off'}
                                        color={'white'}
                                        size={30}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 10
                                    }}
                                >
                                    {item.item.moneyCallRate} $/min
                                </Text>
                            </>}
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        //height: screenStore.getState().footerHeightState,
                        padding: 10,
                    }}
                >
                    <View
                        style={{
                            marginLeft: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            {item.item.title}
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                marginLeft: 7,
                                fontSize: 10
                            }}
                        >
                            {item.item.description}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                    >
                        <Avatar
                            size={40}
                            rounded
                            source={{
                                uri: 'https://service8081.moneyclick.com/attachment/getUserFile/' + item.item.userName,
                                method: 'GET',
                                headers: hmacInterceptor.process(
                                    httpRequest.create(
                                        'https://service8081.moneyclick.com',
                                        '/attachment/getUserFile/' + item.item.userName,
                                        'GET',
                                        null,
                                        false
                                    )).headers,
                            }}
                            overlayContainerStyle={{
                                backgroundColor: 'white',
                            }}
                            disabled={userName === item.item.userName}
                            onPress={() => {
                                navigation.dispatch(StackActions.push('UserDataOthersScreen', { ...route.params, selectedUserName: item.item.userName }))
                            }}
                        />
                        <TouchableOpacity
                            disabled={userName === item.item.userName}
                            onPress={() => {
                                navigation.dispatch(StackActions.push('UserDataOthersScreen', { ...route.params, selectedUserName: item.item.userName }))
                            }}
                        >
                            <View
                                style={{
                                    padding: 5,
                                    marginLeft: 5,
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {item.item.name}
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    {item.item.userSubscribers} subscribers
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {userName !== item.item.userName &&
                            <TouchableOpacity
                                style={{
                                    backgroundColor: item.item.subscribed ? 'silver' : colors.getRandomMain(),
                                    padding: 5,
                                    borderRadius: 5,
                                    marginLeft: 10,
                                    justifyContent: 'center',
                                }}
                                disabled={userName === item.item.userName}
                                onPress={() => {
                                    if (item.item.subscribed) {
                                        console.log('>>>>>>>>>>>> unsubscribe')
                                    } else {
                                        console.log('>>>>>>>>>>>> subscribe')
                                    }
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {item.item.subscribed ? 'unsubscribe' : 'subscribe'}
                                </Text>
                            </TouchableOpacity>}
                        {userName !== item.item.userName &&
                            <TouchableOpacity
                                style={{
                                    marginLeft: 15
                                }}
                                disabled={userName === item.item.userName}
                            >
                                <MaterialCommunityIcons
                                    name={item.item.notification ? 'bell' : 'bell-outline'}
                                    color={'white'}
                                    size={25}
                                />
                            </TouchableOpacity>}
                    </View>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        width: Dimensions.get('window').width,
                    }}
                >
                    {/*<Provider store={sliderStore} >
                        <Body_Shorts_Slider />
                </Provider>*/}
                </View>
            </View>
        </View>
    )

    const keyExtractor = (item) => {
        return (String(item.id))
    }

    const getItemLayout = (data, index, shortsUsableWindowHeight) => ({
        length: shortsUsableWindowHeight,
        offset: (shortsUsableWindowHeight) * index,
        index,
    })

    //PRINCIPAL RENDER
    return (
        <>
            <FlatList
                ref={(ref) => { flatListRef.current = ref; }}
                data={data}
                //renderItem={(item) => renderItem(item, visibleIndex, data.length - 1, shortsUsableWindowHeightState)}
                renderItem={(item) => renderItem(item, visibleIndex, data.length - 1, 400)}
                keyExtractor={keyExtractor}
                removeClippedSubviews={true}
                maxToRenderPerBatch={1}
                pagingEnabled={true}
                windowSize={1}
                initialNumToRender={1}
                //getItemLayout={(data, index) => getItemLayout(data, index, shortsUsableWindowHeightState)}
                updateCellsBatchingPeriod={50}
                viewabilityConfig={React.useRef({ itemVisiblePercentThreshold: 90 }).current}
                onViewableItemsChanged={
                    useRef((viewableItems) => {
                        if (viewableItems !== undefined && viewableItems.viewableItems[0] !== undefined && selectedTab === 0) {
                            const visibleIndex = viewableItems.viewableItems[0].index
                            selectedPlayer.current = PLAYERS[visibleIndex]
                            PLAYERS[visibleIndex]?.seek(0)
                            setVisibleIndex(visibleIndex)
                            if (flatListRef.current !== undefined && Platform.OS === 'android') {
                                flatListRef.current.scrollToIndex({ animated: true, index: visibleIndex });
                            }
                            //sliderStore.dispatch({ type: SET_SLIDER_VALUE, payload: 0 })
                            if ((data.length - visibleIndex) < 5 && unprocessedData.length > 0) {
                                const firstUnprocessedItem = unprocessedData[0];
                                RNFetchBlob.config({
                                    fileCache: true,
                                    appendExt: 'mp4',
                                })
                                    .fetch('GET', 'https://service8081.moneyclick.com/shorts/getAttachment/' + firstUnprocessedItem.videoFileName)
                                    .then(res => {
                                        firstUnprocessedItem.uri = (Platform.OS === 'android') ? 'file://' + res.path() : res.path()
                                        shortsStore.dispatch({ type: 'PUSH_DATA', payload: firstUnprocessedItem })
                                    });
                                shortsStore.dispatch({ type: 'SHIFT_UNPROCESSED_DATA', payload: 1 })
                            }
                        }
                    }).current
                }
                style={{
                    backgroundColor: 'black',
                    zIndex: 30,
                    elevation: (Platform.OS === 'android') ? 100 : 0
                }}
            />
        </>
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
});



export default React.memo(compose(withNavigation, withRoute, withColors, withUserName, withConfig, withHmacInterceptor, connect(mapStateToProps))(ConnectedComponent));