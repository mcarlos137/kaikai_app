//PRINCIPAL
import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { compose } from 'redux'
import { StackActions } from '@react-navigation/native';
//COMPONENTS
import Body from '../../main/components/Body'
import Body_Input from '../../main/components/Body_Input';
import ActionSheetDocument from '../../main/components/ActionSheetDocument';
//FUNCTIONS
import { handleChooseDocument } from '../../main/functions';
//HOC
import { withColors } from '../../main/hoc';

const ShortsCreateScreen = ({ navigation, route, colors }) => {

  /**
   * 
    confirmationModalMessageState: '',
    isLoadingResultState: false
   * 
   */

  //INITIAL STATES
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoAsset, setVideoAsset] = useState({})
  const [videoThumbnailAsset, setVideoThumbnailAsset] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const actionSheetDocumentRef = useRef<any>()

  //EFFECTS
  useEffect(() => {
    console.log('ShortsCreateScreen', route.params)
  }, []);

  //CALLBACKS
  const onChangeTextTitle = useCallback((text) => {
    setTitle(text)
  }, [])

  const onChangeTextDescription = useCallback((text) => {
    setDescription(text)
  }, [])

  return (
    <Body>
      <>
        <ScrollView
          style={{
            width: Dimensions.get('window').width * 0.90,
            alignSelf: 'center',
          }}
        >
          <Body_Input
            value={title}
            type={'text'}
            placeholder={'Title'}
            onChangeText={onChangeTextTitle}
          />
          <Body_Input
            value={description}
            type={'text'}
            placeholder={'Description'}
            onChangeText={onChangeTextDescription}
          />
          {JSON.stringify(videoAsset) !== JSON.stringify({}) &&
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
              }}
            >
              <Video
                source={videoAsset}
                paused={false}
                resizeMode='cover'
                repeat={true}
                onError={(error) => {
                  //console.log('>>>>>>>>>>>>> ' + JSON.stringify(error))
                }}
                style={{
                  height: (Dimensions.get('window').height / Dimensions.get('window').width) * 150,
                  width: 150,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setVideoAsset({})
                }}
                style={{
                  marginLeft: 7
                }}
              //disabled={isLoadingResultState}
              >
                <MaterialCommunityIcons
                  name={'delete'}
                  color={colors.icon}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          }
          {JSON.stringify(videoAsset) === JSON.stringify({}) &&
            <TouchableOpacity
              style={{
                backgroundColor: colors.getRandomMain(),
                marginTop: 20,
                borderRadius: 10,
                padding: 10
              }}
              onPress={() => {
                actionSheetDocumentRef.current?.setModalVisible(true);
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                }}
              >
                {'UPLOAD VIDEO'}
              </Text>
            </TouchableOpacity>
          }
          {JSON.stringify(videoAsset) !== JSON.stringify({}) &&
            <TouchableOpacity
              style={{
                backgroundColor: colors.getRandomMain(),
                marginTop: 20,
                borderRadius: 10,
                padding: 10
              }}
              onPress={() => {
                /*if (dataState.title === '') {
                  Alert.alert(
                    "Operation Error",
                    "Yo need to enter a valid " +
                    'title' +
                    " to complete operation.",
                    [{ text: "Ok" }]
                  );
                  return
                }
                if (dataState.description === '') {
                  Alert.alert(
                    "Operation Error",
                    "Yo need to enter a valid " +
                    'description' +
                    " to complete operation.",
                    [{ text: "Ok" }]
                  );
                  return
                }
                let shortsName = authPersistedStore.getState().configState.nickName
                if (authPersistedStore.getState().configState.firstName !== undefined &&
                  authPersistedStore.getState().configState.lastName !== undefined) {
                  shortsName = authPersistedStore.getState().configState.firstName + ' ' + authPersistedStore.getState().configState.lastName
                }
                indexStore.dispatch({ type: IS_LOADING_RESULT, payload: true })
                shortsCreateStore.dispatch(
                  shortsCreateAction(
                    authPersistedStore.getState().userNameState,
                    shortsName,
                    dataState.title,
                    dataState.description,
                    dataState.videoAsset,
                    "shortsVideo",
                    null
                  )
                )
                console.log("CREATE SHORTS");*/
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                }}
              >
                {'PUBLISH'}
              </Text> :
              <ActivityIndicator
                size={'small'}
                color={'white'}
              //animating={isLoadingResultState}
              />
            </TouchableOpacity>}
        </ScrollView>
        <ActionSheetDocument
          reference={actionSheetDocumentRef}
          onPressCamera={() => {
            actionSheetDocumentRef.current?.setModalVisible(false);
            navigation.dispatch(StackActions.push('CameraBridgeScreen', { ...route.params }))
          }}
          onPressLibrary={() => {
            /*shortsCreateStore.dispatch({
              type: UPDATE_SHORTS_CREATE_DATA,
              payload: { key: 'videoAsset', value: response.assets[0] },
            });*/
            handleChooseDocument(
              'LIBRARY_VIDEO',
              {
                maxWidth: 300,
                maxHeight: 550,
                quality: 1,
                mediaType: "video",
                videoQuality: "high",
                durationLimit: 30
              },
              (asset) => {
                setVideoAsset(asset)
              }
            )
          }}
        />
      </>
    </Body>
  );
};

export default React.memo(compose(withColors)(ShortsCreateScreen));
