//PRINCIPAL
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { compose } from 'redux'
import { StackActions } from '@react-navigation/native';
import uuid from 'react-native-uuid';
//STORES
import { store as mediaStore } from '../../main/stores/media';
//COMPONENTS
import Body from '../../main/components/Body'
import Body_Input from '../../main/components/Body_Input';
import ActionSheetDocument from '../../main/components/ActionSheetDocument';
//FUNCTIONS
import { handleChooseDocument } from '../../main/functions';
//HOC
import { withColors, withUserName } from '../../main/hoc';
//HOOKS
import { createShort } from '../../main/hooks/createShort';
import { createThumbnail } from 'react-native-create-thumbnail';

const ShortsCreateScreen = ({ navigation, route, colors, userName }) => {

  /**
   * 
    confirmationModalMessageState: '',
    isLoadingResultState: false
   * 
   */

  //INITIAL STATES
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoAsset, setVideoAsset] = useState<any>({})
  const assetId = useRef<string>(String(uuid.v4()))
  const actionSheetDocumentRef = useRef<any>()

  //HOOKS CALLS
  const { mutate: mutateCreateShort, isSuccess: isSuccessCreateShort, isLoading: isLoadingCreateShort } = createShort()

  //EFFECTS
  useEffect(() => {
    console.log('ShortsCreateScreen', route.params)
  }, []);

  useEffect(() => {
    if (isSuccessCreateShort) {
      mediaStore.dispatch({ type: 'SET_ASSET', payload: { id: assetId.current, videoAsset: videoAsset } })
      createThumbnail({
        url: videoAsset.uri,
        timeStamp: 2000,
      })
        .then(response => {
          mediaStore.dispatch({ type: 'SET_ASSET', payload: { id: assetId.current, imageAsset: { uri: (Platform.OS === 'android') ? 'file://' + response.path : response.path } } })
          navigation.dispatch(StackActions.pop())
        })
        .catch(err => {
          console.log('>>>>>>>>>>err ' + JSON.stringify(err))
        });
    }
  }, [isSuccessCreateShort]);

  //CALLBACKS
  const onChangeTextTitle = useCallback((text) => {
    setTitle(text)
  }, [])

  const onChangeTextDescription = useCallback((text) => {
    setDescription(text)
  }, [])

  const onPressPublish = useCallback(() => {
    if (title === '') {
      Alert.alert(
        "Operation Error",
        "Yo need to enter a valid " +
        'title' +
        " to complete operation.",
        [{ text: "Ok" }]
      );
      return
    }
    if (description === '') {
      Alert.alert(
        "Operation Error",
        "Yo need to enter a valid " +
        'description' +
        " to complete operation.",
        [{ text: "Ok" }]
      );
      return
    }
    mutateCreateShort({
      userName: userName,
      name: 'Carlos Molina',
      title: title,
      description: description,
      publishTimestamp: null,
      videoAsset: videoAsset,
      assetId: assetId.current
    })
  }, [title, description, videoAsset])

  const onPressCamera = useCallback(() => {
    actionSheetDocumentRef.current?.setModalVisible(false);
    navigation.dispatch(StackActions.push('CameraBridgeScreen', { ...route.params }))
  }, [])

  const onPressLibrary = useCallback(() => {
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
        actionSheetDocumentRef.current?.setModalVisible(false);
        console.log('asset', asset)
        setVideoAsset(asset)
      }
    )
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
                controls={true}
                repeat={true}
                onError={(error) => {
                  //console.log('>>>>>>>>>>>>> ' + JSON.stringify(error))
                }}
                style={{
                  width: Dimensions.get('window').width * 0.8,
                  height:  Dimensions.get('window').width * 0.8 * videoAsset.height / videoAsset.width,                  
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setVideoAsset({})
                }}
                style={{
                  marginLeft: 7
                }}
              >
                <MaterialCommunityIcons
                  name={'delete'}
                  color={colors.icon}
                  size={30}
                />
              </TouchableOpacity>
            </View>}
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
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              disabled={isLoadingCreateShort}
              onPress={onPressPublish}
            >
              <Text
                style={{
                  color: 'white',
                }}
              >
                {'PUBLISH'}
              </Text>
              {isLoadingCreateShort && <ActivityIndicator size="small" color={'white'} style={{ marginLeft: 10 }} />}
            </TouchableOpacity>}
        </ScrollView>
        <ActionSheetDocument
          reference={actionSheetDocumentRef}
          onPressCamera={onPressCamera}
          onPressLibrary={onPressLibrary}
        />
      </>
    </Body>
  );
};

export default React.memo(compose(withColors, withUserName)(ShortsCreateScreen));
