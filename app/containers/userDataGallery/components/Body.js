import React, { Fragment } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    ScrollView,
    RefreshControl
} from 'react-native';
import { connect } from "react-redux";
import { createThumbnail } from "react-native-create-thumbnail";
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image'
//TOOLS
import httpRequest from '../../../tools/httpRequest';
//STORES
import {
    indexStore
} from '../store'
import {
    headersStore,
    navigateStore
} from '../../../main/store'
//ACTIONS
import {
    NAVIGATE,
    MODIFY_USER_DATA_GALLERY_VIDEO_THUMBNAILS,
    OPEN_MODAL,
    SET_SELECTED_USER_DATA_GALLERY_COUNTDOWN,
    IS_LOADING,
} from '../../../constants/action-types'
//COMPONENTS
import ActionSheetDocument from '../../../main/components/ActionSheetDocument'
import ViewEmptyList from '../../../main/components/ViewEmptyList'

const getThumbnail = (selectedUserName, itemName) => {
    createThumbnail({
        url: 'https://service8081.moneyclick.com/attachment/getUserFile/' + selectedUserName + '/' + itemName,
        timeStamp: 0,
        headers: headersStore.getState().hmacInterceptorState.process(
            httpRequest.create(
                'https://service8081.moneyclick.com',
                '/attachment/getUserFile/' + selectedUserName + '/' + itemName,
                'GET',
                null,
                false
            )).headers,
    })
        .then(response => {
            indexStore.dispatch({ type: MODIFY_USER_DATA_GALLERY_VIDEO_THUMBNAILS, payload: { source: { uri: response.path }, key: itemName } })
        })
        .catch(err => {
            console.log('>>>>>>>>>>err ' + JSON.stringify(err))
            //console.log({ err })
        });
}

const mapStateToProps = state => {
    return {
        selectedUserNameState: state.selectedUserNameState,
        selectedGalleryTypeState: state.selectedGalleryTypeState,
        dataState: state.dataState,
        videoThumbnailsState: state.videoThumbnailsState,
        addAllowedState: state.addAllowedState,
        actionSheetDocumentRefState: state.actionSheetDocumentRefState,
        countdownState: state.countdownState,
        showCountdownState: state.showCountdownState,
        openModalState: state.openModalState,
        isLoadingState: state.isLoadingState,
        updateCountState: state.updateCountState
    };
};

const ConnectedComponent = ({
    selectedUserNameState,
    selectedGalleryTypeState,
    dataState,
    videoThumbnailsState,
    addAllowedState,
    actionSheetDocumentRefState,
    countdownState,
    showCountdownState,
    openModalState,
    isLoadingState,
    updateCountState
}) => (
    <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center' }}>
        {selectedGalleryTypeState === 'premiumGallery' && !openModalState && showCountdownState &&
            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{
                        color: countdownState[selectedUserNameState] <= 10 ? 'red' : 'white',
                        fontSize: 18
                    }}
                >
                    {countdownState[selectedUserNameState]} seconds left
                </Text>
            </View>}
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isLoadingState}
                    onRefresh={() => {
                        //REVIEW REFRESH CONTROL
                        console.log('>>>>>>>>>>>>START REFRESHING')
                        indexStore.dispatch({ type: IS_LOADING, payload: true })
                        setTimeout(() => {
                            console.log('>>>>>>>>>>>>STOP REFRESHING')
                            indexStore.dispatch({ type: IS_LOADING, payload: false })
                        }, 1000)
                    }}
                    tintColor={navigateStore.getState().selectedColorState}
                    colors={[navigateStore.getState().selectedColorState]}
                />
            }
            style={{
                flex: 1,
                width: Dimensions.get('window').width,
            }}
            removeClippedSubviews={true}
        >
            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}
            >
                {dataState[selectedGalleryTypeState].length === 0 &&
                    <ViewEmptyList
                        operation={'USER_DATA_GALLERY'}
                        message={'There is no images or videos'}
                        color={'gray'}
                        top={30}
                        position={'absolute'}
                    />
                }
                {dataState[selectedGalleryTypeState].map((item, index) => {
                    return (
                        <Fragment
                            key={index}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setTimeout(() => {
                                        console.log('WAIT')
                                        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'UserDataGalleryViewScreen', selectedGalleryItem: item } })
                                    }, 0)
                                }}
                                //onLongPress={() => {
                                //}}
                                activeOpacity={0.9}
                            >
                                {item.type === 'video' && getThumbnail(selectedUserNameState, item.name)}
                                <FastImage
                                    style={{
                                        width: dataState[selectedGalleryTypeState].length === 0 ? 0 : dataState[selectedGalleryTypeState].length <= 4 && dataState[selectedGalleryTypeState].length > 0 ? 160 : dataState[selectedGalleryTypeState].length <= 8 && dataState[selectedGalleryTypeState].length > 4 ? 120 : 80,
                                        height: dataState[selectedGalleryTypeState].length === 0 ? 0 : dataState[selectedGalleryTypeState].length <= 4 && dataState[selectedGalleryTypeState].length > 0 ? 160 : dataState[selectedGalleryTypeState].length <= 8 && dataState[selectedGalleryTypeState].length > 4 ? 120 : 80,
                                        margin: 5,
                                        borderRadius: 16,
                                        borderWidth: 0.75,
                                        borderColor: 'white'
                                    }}
                                    source={
                                        item.type === 'image' ?
                                            { uri: item.uri } :
                                            videoThumbnailsState[item.name] !== undefined ?
                                                videoThumbnailsState[item.name] :
                                                require('../../../../assets/blank.png')
                                    }
                                >
                                    {item.type === 'video' &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'UserDataGalleryViewScreen', selectedGalleryItem: item } })
                                            }}
                                            style={{
                                                width: dataState[selectedGalleryTypeState].length === 0 ? 0 : dataState[selectedGalleryTypeState].length <= 4 && dataState[selectedGalleryTypeState].length > 0 ? 160 : dataState[selectedGalleryTypeState].length <= 8 && dataState[selectedGalleryTypeState].length > 4 ? 120 : 80,
                                                height: dataState[selectedGalleryTypeState].length === 0 ? 0 : dataState[selectedGalleryTypeState].length <= 4 && dataState[selectedGalleryTypeState].length > 0 ? 160 : dataState[selectedGalleryTypeState].length <= 8 && dataState[selectedGalleryTypeState].length > 4 ? 120 : 80,
                                                backgroundColor: 'transparent',
                                                zIndex: 15,
                                                elevation: (Platform.OS === 'android') ? 50 : 0
                                            }}
                                        >
                                            <IconMaterialCommunity
                                                name={'play-circle-outline'}
                                                color={'white'}
                                                size={dataState[selectedGalleryTypeState].length === 0 ? 0 : dataState[selectedGalleryTypeState].length <= 4 && dataState[selectedGalleryTypeState].length > 0 ? 160 : dataState[selectedGalleryTypeState].length <= 8 && dataState[selectedGalleryTypeState].length > 4 ? 120 : 80}
                                            />
                                        </TouchableOpacity>}
                                </FastImage>
                            </TouchableOpacity>
                        </Fragment>
                    )
                })}
            </View>
        </ScrollView>
        {addAllowedState &&
            <>
                {/*<IconMaterialCommunity
                    name={'plus'}
                    color={'white'}
                    size={30}
                    style={{
                        width: 60,
                        backgroundColor: navigateStore.getState().selectedColorState,
                        padding: 15,
                        borderRadius: 30,
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        zIndex: 15,
                        elevation: (Platform.OS === 'android') ? 50 : 0
                    }}
                    onPress={() => {
                        actionSheetDocumentRefState.current?.setModalVisible(true);
                        indexStore.dispatch({ type: UPDATE_USER_DATA_GALLERY_DATA })
                    }}
                />*/}
                <ActionSheetDocument
                    actionSheetDocumentRef={actionSheetDocumentRefState}
                    operation={selectedGalleryTypeState === 'premiumGallery' ? 'USER_DATA_GALLERY_PREMIUM' : 'USER_DATA_GALLERY'}
                    cameraType={'CAMERA_PHOTO_VIDEO'}
                    libraryType={'LIBRARY_PHOTO_VIDEO'}
                    color={navigateStore.getState().selectedColorState}
                />
            </>}
    </View>
);

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;