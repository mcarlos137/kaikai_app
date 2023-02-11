//PRINCIPAL
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { compose } from 'redux'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StackActions } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
//STORES
import { store as mediaStore } from '../../main/stores/media';
//COMPONENTS
import ViewEmptyList from '../../main/components/ViewEmptyList'
import ActionSheetDocument from '../../main/components/ActionSheetDocument';
import Body_Image from './components/Body_image'
//HOOKS
import { getConfigGallery } from '../../main/hooks/getConfigGallery';
import { addUserAttachment } from '../../main/hooks/addUserAttachment';
//HOC
import { withColors, withUserName } from '../../main/hoc';
//FUNCTIONS
import { handleChooseDocument } from '../../main/functions';

const UserDataGalleryScreen = ({ navigation, route, colors, userName }) => {

  //INITIAL STATES
  const [selectedUserName, setSelectedUserName] = useState(route?.params?.selectedUserName !== undefined ? route.params.selectedUserName : userName)
  const [type, setType] = useState(route?.params?.selectedGalleryType?.split('__')[0])
  const [addAllowed, setAddAllowed] = useState(selectedUserName === userName ? true : false)
  const [openModal, setOpenModal] = useState(false)
  const [countdown, setCountdown] = useState({})
  const [stopInterval, setStopInterval] = useState(false)
  const actionSheetDocumentRef = useRef<any>()
  const [showCountdown, setShowCountdown] = useState(route?.params?.selectedGalleryType?.split('__')[1] === undefined || route?.params?.selectedGalleryType?.split('__')[1] === 'ADD' ? false : true)

  //HOOKS CALLS
  const { isLoading: isLoadingConfigGallery, data: dataConfigGallery, error: errorConfigGalleryx, refetch: refetchConfigGallery } =
    getConfigGallery(selectedUserName, type)

  const { mutate: mutateAddUserAttachment, isLoading: isLoadingAddUserAttachment } = addUserAttachment()

  //EFFECTS
  useEffect(() => {
    console.log('UserDataGalleryScreen', route.params)

    /*if (route.params.selectedSubscriptionDetails !== undefined) {
  indexStore.dispatch({ type: SET_SELECTED_USER_DATA_GALLERY_SUBSCRIPTION_DETAILS, payload: route.params.selectedSubscriptionDetails })
}*/
    if (route.params.selectedGalleryType.split('__')[1] !== undefined && route.params.selectedGalleryType.split('__')[1] !== 'ADD') {
      console.log('>>>>>>>>>>>>>>>>>>>> time left ' + route.params.selectedGalleryType.split('__')[1])
      if (Number(route.params.selectedGalleryType.split('__')[1]) === 0 || countdown[selectedUserName] === 0) {
        //indexStore.dispatch({ type: OPEN_MODAL, payload: true })
      } else {
        //indexStore.dispatch({ type: SHOW_SELECTED_USER_DATA_GALLERY_COUNTDOWN, payload: true })
        let countdown = route.params.selectedGalleryType.split('__')[1]
        //indexStore.dispatch({ type: SET_SELECTED_USER_DATA_GALLERY_COUNTDOWN, payload: { userName: selectedUserName, countdown: countdown } })
        //indexStore.getState().stopIntervalState = false
        let interval = setInterval(() => {
          if (stopInterval) {
            clearInterval(interval)
          }
          countdown = countdown - 1
          //indexStore.dispatch({ type: SET_SELECTED_USER_DATA_GALLERY_COUNTDOWN, payload: { userName: selectedUserName, countdown: countdown } })
          //premiumPersistedStore.dispatch({ type: MARK_SOCIAL_PREMIUM_DATA_PREVIEW_VIEWED_COUNTDOWN, payload: { userName: selectedUserName, countdown: countdown } })
          if (countdown === 0) {
            setOpenModal(true)
            clearInterval(interval)
          }
        }, 1000)
      }
    }
    if (route.params.selectedGalleryType.split('__')[1] !== undefined && route.params.selectedGalleryType.split('__')[1] === 'ADD') {
      setTimeout(() => {
        actionSheetDocumentRef.current.setModalVisible(true)
      },
        1000)
    }
  }, []);

  useEffect(() => {
    if (selectedUserName === userName) {
      navigation.setOptions({
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                actionSheetDocumentRef.current.setModalVisible(true)
              }}
            >
              <Ionicons
                name="ios-add"
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        )
      })
    }
  }, [])

  useEffect(() => {
    const assetsBatchControl: string[] = []
    dataConfigGallery.map(item => {
      if(mediaStore.getState().assets[item.name] === undefined) {
        assetsBatchControl.push(item.name)
      } 
    })
    //mediaStore.dispatch({ type: 'SET_ASSETS_BATCH_CONTROL', payload: assetsBatchControl })
  }, [dataConfigGallery])

  //MEMOS
  const data = useMemo(() => {
    const initialData = {
      gallery: [],
      premiumGallery: []
    }
    return { ...initialData, [type]: dataConfigGallery }
  }, [dataConfigGallery])

  //CALLBACKS
  const onPressCamera = useCallback(() => {
    actionSheetDocumentRef.current?.setModalVisible(false);
    navigation.dispatch(StackActions.push('CameraBridgeScreen', { ...route.params }))
  }, [])

  const onPressLibrary = useCallback(() => {
    handleChooseDocument(
      'LIBRARY_PHOTO_VIDEO',
      {
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        mediaType: "mixed",
        videoQuality: "high",
        durationLimit: 30
      },
      (attachment) => {
        actionSheetDocumentRef.current?.setModalVisible(false);
        console.log('attachment', attachment)
        mutateAddUserAttachment({
          userName: userName,
          fieldName: new Date().toISOString().split(":").join("-").split(".").join("--"),
          attachment: attachment,
          type: 'premiumGallery'
        })
      }
    )
  }, [])


  //PRINCIPAL RENDER
  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center' }}>
        {type === 'premiumGallery' && !openModal && showCountdown &&
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
                color: countdown[selectedUserName] <= 10 ? 'red' : 'white',
                fontSize: 18
              }}
            >
              {countdown[selectedUserName]} seconds left
            </Text>
          </View>}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoadingConfigGallery || isLoadingAddUserAttachment}
              onRefresh={() => {
                //REVIEW REFRESH CONTROL
                console.log('>>>>>>>>>>>>START REFRESHING')
                refetchConfigGallery()
              }}
              tintColor={colors.getRandomMain()}
              colors={[colors.getRandomMain()]}
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
            {data[type]?.length === 0 &&
              <ViewEmptyList
                iconName='folder-multiple-outline'
                iconFamily='MATERIAL_COMMUNITY'
                message={'There is no images or videos'}
                top={30}
                position={'absolute'}
                color='gray'
              />
            }
            {data[type]?.length > 0 && data[type]?.map((item, index) => {
              return (
                <Fragment
                  key={index}
                >
                  <Body_Image
                    userName={selectedUserName}
                    fileName={item.name}
                    type={item.type}
                    width={data[type].length === 0 ? 0 : data[type].length <= 4 && data[type].length > 0 ? 160 : data[type].length > 4 && data[type].length <= 20 ? 120 : 80}
                    onPress={() => {
                      setTimeout(() => {
                        console.log('WAIT')
                        navigation.dispatch(StackActions.push('UserDataGalleryViewScreen', { ...route.params, selectedGalleryItem: item }))
                      }, 0)
                    }}
                  />
                </Fragment>
              )
            })}
          </View>
        </ScrollView>
        {addAllowed &&
          <>
          </>}
      </View>
      <ActionSheetDocument
        reference={actionSheetDocumentRef}
        onPressCamera={onPressCamera}
        onPressLibrary={onPressLibrary}
      />
    </>
  );
};

export default React.memo(compose(withColors, withUserName)(UserDataGalleryScreen));

