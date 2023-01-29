//PRINCIPAL
import React, { createRef, useEffect, useState } from 'react';
import { View } from 'react-native-animatable';

const FiatBankDepositsPayScreen = ({ navigation, route }) => {

  const [deposit, setDeposit] = useState(route.params.selectedFiatBankDeposit)
  const [asset, setAsset] = useState(null)

  useEffect(() => {
    console.log('FiatBankDepositsPayScreen', route.params)
    return unsubscribe;
  }, []);

  return (
    <>
      <View
        style={{
          width: Dimensions.get('window').width * 0.95,
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 20,
          flex: 1
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: 20
          }}
        >
          Deposit exact amount to:
        </Text>
        {/*<View_Payment selectedPayment={selectedFiatBankDepositState.dollarBTCPayment} />*/}
        {/*JSON.stringify(fileAssetState) !== JSON.stringify({}) &&
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={{
                uri: fileAssetState.uri,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                indexStore.dispatch({ type: SET_FIAT_BANK_DEPOSIT_PAY_FILE_ASSET, payload: {} })
              }}
              style={{
                marginLeft: 30
              }}
            >
              <IconMaterialCommunity
                name={'delete'}
                color={navigateStore.getState().selectedColorState}
                size={30}
              />
            </TouchableOpacity>
          </View>*/}
        {/*<TouchableOpacity
          style={{
            backgroundColor: navigateStore.getState().selectedColorState,
            marginTop: 10
          }}
          onPress={() => {
            if (JSON.stringify(fileAssetState) === JSON.stringify({})) {
              actionSheetDocumentRefState.current?.setModalVisible(true);
            } else {
              //SEND IMAGE TO CHAT
              changeBuyBalanceOperationStatusStore.dispatch(
                changeBuyBalanceOperationStatusAction(
                  selectedFiatBankDepositState.id,
                  'PAY_VERIFICATION',
                  null
                )
              )
            }
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              padding: 10
            }}
          >
            {JSON.stringify(fileAssetState) === JSON.stringify({}) ? 'UPLOAD PAYMENT FILE' : 'SEND'}
          </Text>
        </TouchableOpacity>
        <ActionSheetDocument
          actionSheetDocumentRef={actionSheetDocumentRefState}
          operation={'FIAT_BANK_DEPOSIT_PAY'}
          cameraType={'CAMERA_PHOTO'}
          libraryType={'LIBRARY_PHOTO'}
          color={navigateStore.getState().selectedColorState}
          />*/}
      </View>
    </>
  );
};

export default React.memo(FiatBankDepositsPayScreen);
