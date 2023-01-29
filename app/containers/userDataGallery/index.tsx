//PRINCIPAL
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, Text, View } from 'react-native';
import { compose } from 'redux'
//COMPONENTS
import ViewEmptyList from '../../main/components/ViewEmptyList'
import Body_Image from './components/Body_Image'
import { getConfigGallery } from '../../main/hooks/getConfigGallery';
import { withColors, withUserName } from '../../main/hoc';

const UserDataGalleryScreen = ({ navigation, route, colors, userName }) => {

  //INITIAL STATES
  const [selectedUserName, setSelectedUserName] = useState(route?.params?.selectedUserName !== undefined ? route.params.selectedUserName : userName)
  const [type, setType] = useState(route?.params?.selectedGalleryType?.split('__')[0])
  const [videoThumbnails, setVideoThumbnails] = useState({})
  const [addAllowed, setAddAllowed] = useState(selectedUserName === userName ? true : false)
  const [openModal, setOpenModal] = useState(false)
  const [countdown, setCountdown] = useState({})
  const [stopInterval, setStopInterval] = useState(false)
  const [showCountdown, setShowCountdown] = useState(route?.params?.selectedGalleryType?.split('__')[1] === undefined ? false : true)

  //HOOKS CALLS
  const { isLoading: isLoadingConfigGallery, data: dataConfigGallery, error: errorConfigGalleryx } =
    getConfigGallery(selectedUserName, type)

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
        //indexStore.getState().actionSheetDocumentRefState.current?.setModalVisible(true);
      },
        1000)
    }
  }, []);

  /*useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('OUT OF USER DATA GALLERY')
      //indexStore.getState().stopIntervalState = true
    });
    return unsubscribe;
  }, [navigation]);*/

  const data = useMemo(() => {
    const initialData = {
      gallery: [],
      premiumGallery: []
    }
    return { ...initialData, [type]: dataConfigGallery }
  }, [dataConfigGallery])

  //PRINCIPAL RENDER
  return (
    <View style={{
      flex: 1
    }}>
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
              refreshing={false}
              onRefresh={() => {
                //REVIEW REFRESH CONTROL
                console.log('>>>>>>>>>>>>START REFRESHING')
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
                    width={data[type].length === 0 ? 0 : data[type].length <= 4 && data[type].length > 0 ? 160 : data[type].length > 4 && data[type].length <= 20 ? 120 : 80}
                    height={data[type].length === 0 ? 0 : data[type].length <= 4 && data[type].length > 0 ? 160 : data[type].length > 4 && data[type].length <= 20 ? 120 : 80}
                    item={item}
                    userName={selectedUserName}
                  />
                </Fragment>
              )
            })}
          </View>
        </ScrollView>
        {addAllowed &&
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
            {/*<ActionSheetDocument
              actionSheetDocumentRef={actionSheetDocumentRefState}
              operation={selectedGalleryTypeState === 'premiumGallery' ? 'USER_DATA_GALLERY_PREMIUM' : 'USER_DATA_GALLERY'}
              cameraType={'CAMERA_PHOTO_VIDEO'}
              libraryType={'LIBRARY_PHOTO_VIDEO'}
              color={navigateStore.getState().selectedColorState}
              />*/}
          </>}
      </View>
    </View >
  );
};

export default React.memo(compose(withColors, withUserName)(UserDataGalleryScreen));

