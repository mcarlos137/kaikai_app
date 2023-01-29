import React from 'react';
import {
    View,
    Dimensions,
    Text,
    ScrollView,
    Platform,
    TouchableOpacity,
    Switch,
    Image,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Share from "react-native-share";
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image'
import { createThumbnail } from 'react-native-create-thumbnail';
import { connect } from "react-redux";
import { useTheme } from 'react-native-paper';
//STORES
import { changeStatusStore, indexStore, listStore } from '../store';
import { authPersistedStore, headersStore, navigateStore } from '../../../main/store';
//ACTIONS
import { IS_LOADING, MODIFY_SHORTS_VIDEO_THUMBNAILS, NAVIGATE, SET_SELECTED_BROADCASTING_ID, UPDATE_BROADCASTING_DATA, UPDATE_BROADCASTING_DATA_VALUE } from '../../../constants/action-types';
import { changeStatusAction, listAction } from '../actions';
//CONSTANTS
import { REACTIONS } from '../../../constants/social';
//TOOLS
import httpRequest from '../../../tools/httpRequest';
//COMPONENTS
import ActionSheetDocument from '../../../main/components/ActionSheetDocument'
import ViewInstructions from '../../../main/components/ViewInstructions'
//FUNCTIONS
import { decorateTimestamp, getReactionsQuantity } from '../../../main/functions';

const INSTRUCTIONS = [
    { text: 'Create a new short ("+" button on top) and upload your videos (30 secs or less).', iconName: '' },
    { text: 'Your videos will be reviewed and approved previously to be in the Shorts Feed', iconName: '' },
    { text: 'Accept donations from other users, provide the possibility to create paid calls with you and present your broadcastings and advidors.', iconName: '' },
]

const getThumbnail = (id, uri) => {
    createThumbnail({
        url: uri,
        timeStamp: 0,
    })
        .then(response => {
            indexStore.dispatch({ type: MODIFY_SHORTS_VIDEO_THUMBNAILS, payload: { source: { uri: response.path }, key: id } })
        })
        .catch(err => {
            console.log('>>>>>>>>>>err ' + JSON.stringify(err))
            //console.log({ err })
        });
}

const mapStateToProps = state => {
    return {
        dataState: state.dataState,
        actionSheetDocumentRefState: state.actionSheetDocumentRefState,
        updateCountState: state.updateCountState,
        videoThumbnailsState: state.videoThumbnailsState,
        isLoadingState: state.isLoadingState,
    };
};

const ConnectedComponent = ({
    dataState,
    actionSheetDocumentRefState,
    updateCountState,
    videoThumbnailsState,
    isLoadingState,
}) => {
    const { colors } = useTheme();
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isLoadingState}
                    onRefresh={() => {
                        indexStore.dispatch({ type: IS_LOADING, payload: true })
                        listStore.dispatch(
                            listAction(
                                [authPersistedStore.getState().userNameState],
                                null,
                                null,
                                null,
                                null
                            )
                        )
                    }}
                    tintColor={navigateStore.getState().selectedColorState}
                    colors={[navigateStore.getState().selectedColorState]}
                />
            }
            persistentScrollbar={true}
            style={{
                paddingLeft: 10,
                paddingRight: 10,
                alignSelf: 'center',
                width: Dimensions.get('window').width * 0.95,
                marginBottom: 20
            }}
        >
            {dataState.length === 0 && !isLoadingState ?
                <ViewInstructions
                    instructions={INSTRUCTIONS}
                    type={'STEPS'}
                    color={navigateStore.getState().selectedColorState}
                    width={Dimensions.get('window').width * 0.95}
                />
                :
                <>
                    {dataState.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flexDirection: index % 2 === 1 ? 'row-reverse' : 'row',
                                    marginTop: 10,
                                }}
                            >
                                {getThumbnail(item.id, item.uri)}
                                <View
                                    style={{
                                        alignSelf: 'center',
                                        padding: 10,
                                        borderRadius: 10,
                                        width: Dimensions.get('window').width * 0.75,
                                        flexDirection: index % 2 === 1 ? 'row' : 'row-reverse',
                                        //flexDirection: 'row',
                                        minHeight: 200,
                                        backgroundColor: colors.primaryBackground
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 0.65,
                                            marginLeft: index % 2 === 1 ? 0 : 10,
                                            marginRight: index % 2 === 1 ? 10 : 0,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                color: colors.text
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                marginTop: 3,
                                                color: colors.text
                                            }}
                                        >
                                            {decorateTimestamp(item.timestamp)}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                marginTop: 3,
                                                color: colors.text
                                            }}
                                        >
                                            {item.description}
                                        </Text>
                                        <View
                                            style={{
                                                marginTop: 7,
                                                flexDirection: 'row',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: colors.text
                                                }}
                                            >
                                                Tags:
                                            </Text>
                                            {item.tags.map((it, ind) => {
                                                return (
                                                    <Text
                                                        key={ind}
                                                        style={{
                                                            fontSize: 12,
                                                            marginLeft: 3,
                                                            color: colors.text
                                                        }}
                                                    >
                                                        {it}
                                                    </Text>
                                                )
                                            })}
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 3,
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: colors.text
                                                }}
                                            >
                                                Donations:
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    marginLeft: 3,
                                                    color: colors.text
                                                }}
                                            >
                                                {item.donationsAmountUSD} {'USD'}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 3,
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: colors.text
                                                }}
                                            >
                                                Views:
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    marginLeft: 3,
                                                    color: colors.text
                                                }}
                                            >
                                                {item.views.length}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 3,
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: colors.text
                                                }}
                                            >
                                                Shares:
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    marginLeft: 3,
                                                    color: colors.text
                                                }}
                                            >
                                                {item.shares.length}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 3,
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: colors.text
                                                }}
                                            >
                                                Comments:
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    marginLeft: 3,
                                                    color: colors.text
                                                }}
                                            >
                                                {item.commentsCount}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 3,
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: colors.text
                                                }}
                                            >
                                                Status:
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    marginLeft: 3,
                                                    color: colors.text
                                                }}
                                            >
                                                {item.status}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flex: 0.35,
                                            backgroundColor: navigateStore.getState().selectedColorState,
                                            alignItems: 'center',
                                            borderRadius: 10, padding: 5
                                        }}
                                    >
                                        <FastImage
                                            style={{
                                                padding: 10,
                                                height: 80,
                                                width: 80,
                                            }}
                                            source={
                                                videoThumbnailsState[item.id] !== undefined ?
                                                    videoThumbnailsState[item.id] :
                                                    require('../../../../assets/blank.png')
                                            }
                                        />
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: 5
                                            }}
                                        >
                                            <IconMaterialCommunity
                                                name={'cards-heart'}
                                                color={'white'}
                                                size={20}
                                                style={{
                                                    marginRight: 3
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    color: colors.text
                                                }}
                                            >
                                                {getReactionsQuantity(item.reactions, ['loves'])}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 'bold',
                                                marginTop: 5,
                                                marginBottom: 3,
                                                color: 'white'
                                            }}
                                        >
                                            comments
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {REACTIONS.map((it, ind) => {
                                                return (
                                                    <View
                                                        key={ind}
                                                        style={{
                                                            flexDirection: 'row',
                                                            marginLeft: 3
                                                        }}
                                                    >
                                                        <Image
                                                            style={{
                                                                width: 20,
                                                                height: 20,
                                                            }}
                                                            source={
                                                                it === 'LIKES' ? require("../../../../assets/like.gif") :
                                                                    it === 'LOVES' ? require("../../../../assets/love.gif") :
                                                                        it === 'HAHAS' ? require("../../../../assets/haha.gif") :
                                                                            it === 'WOWS' ? require("../../../../assets/wow.gif") :
                                                                                it === 'SADS' ? require("../../../../assets/sad.gif") :
                                                                                    it === 'ANGRIES' ? require("../../../../assets/angry.gif") : ''
                                                            }
                                                        />
                                                        <Text
                                                            style={{
                                                                color: 'white'
                                                            }}
                                                        >
                                                            {getReactionsQuantity(item.reactions, [it])}
                                                        </Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        width: Dimensions.get('window').width * 0.15,
                                        marginRight: index % 2 === 1 ? 10 : 0,
                                        marginLeft: index % 2 === 1 ? 0 : 10,
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        padding: 5
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            alignSelf: 'center',
                                            marginBottom: 8
                                        }}
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
                                                    console.log('>>>>>>>>>>>> share')
                                                })
                                                .catch((error) => {
                                                    console.log({ error });
                                                });
                                        }}
                                    >
                                        <IconMaterialCommunity
                                            name={'share-variant'}
                                            color={colors.icon}
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            alignSelf: 'center',
                                            marginBottom: 8
                                        }}
                                        onPress={() => {
                                            navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'ShortsVideoScreen', selectedShorts: item } })
                                        }}
                                    >
                                        <IconMaterialCommunity
                                            name={'video'}
                                            color={colors.icon}
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            alignSelf: 'center',
                                        }}
                                        onPress={() => {
                                            navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'ShortsCommentsScreen', selectedShorts: item } })
                                        }}
                                    >
                                        <IconMaterialCommunity
                                            name={'comment'}
                                            color={colors.icon}
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                    {(item.status === 'PUBLISHED' || item.status === 'INACTIVE') &&
                                        <Switch
                                            trackColor={{ false: "red", true: "green" }}
                                            thumbColor={"#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={(value) => {
                                                changeStatusStore.dispatch(
                                                    changeStatusAction(
                                                        item.id,
                                                        item.status === 'PUBLISHED' ? 'INACTIVE' : 'PUBLISHED',
                                                        'BROADCASTING'
                                                    )
                                                )
                                                indexStore.dispatch({ type: SET_SELECTED_BROADCASTING_ID, payload: item.id })
                                                indexStore.dispatch({ type: UPDATE_BROADCASTING_DATA_VALUE, payload: { key: 'status', value: item.status === 'PUBLISHED' ? 'INACTIVE' : 'PUBLISHED' } })
                                            }}
                                            style={{
                                                marginTop: 15,
                                                alignSelf: 'center'
                                            }}
                                            value={item.status === 'PUBLISHED'}
                                            disabled={false}
                                        />}
                                </View>
                            </View>
                        )
                    })}
                </>
            }
        </ScrollView>
    )
};

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;