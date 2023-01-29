import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackActions } from '@react-navigation/native';
//FUNCTIONS
//import { openQRScan } from '../../main/functions';
//COMPONENTS
//import Body from './components/Body';
//import Modal from './components/Modal';

const GiftCardRedeemScreen = ({ navigation, route }) => {

  const [id, setId] = useState('')
  const [openQRScanner, setOpenQRScanner] = useState(false)

  const { colors } = useTheme()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('FOCUS ON GIFT CARD REDEEM', route.params);
      navigation.setOptions({
        headerStyle: { backgroundColor: colors.getRandomMain() },
      })
      /*let selectedGiftCardType;
      if (route.params !== undefined &&
        route.params.selectedGiftCardType !== undefined
      ) {
        selectedGiftCardType = route.params.selectedGiftCardType;
      } else {
        selectedGiftCardType = 'BITCOINRECHARGE';
      }
      indexStore.dispatch(
        { type: SET_GIFT_CARD_REDEEM_TYPE, payload: selectedGiftCardType }
      )*/
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('OUT OF GIFT CARD REDEEM');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <View style={{
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.90,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TextInput
          placeholder={'Gift Card id'}
          value={id}
          maxLength={60}
          onChangeText={(text) => {
            setId(text)
          }}
          placeholderTextColor={colors.placeholderText}
          style={{
            fontSize: 14,
            color: colors.text,
            backgroundColor: colors.primaryBackground,
            marginTop: 10,
            flex: 0.9,
            padding: 10,
            borderRadius: 10
          }}
        />
        <TouchableOpacity
          style={{ paddingLeft: 15, paddingTop: 5, flex: 0.1 }}
          onPress={() => {
            console.log('open>>>>>')
            navigation.dispatch(StackActions.push('CameraBridgeScreen', { ...route.params }))
            /*openQRScan(() => {
              navigation.dispatch(StackActions.push('QRCodeScannerScreen', { ...route.params, selectedOperation: 'GIFT_CARD_REDEEM' }))
            })*/
          }}
        >
          <MaterialCommunityIcons
            name="qrcode"
            color={colors.icon}
            size={40}
          />
        </TouchableOpacity>
      </View>
      {/*openQRScanner &&
        <QRCodeScanner
          checkAndroid6Permissions
          onRead={node => {
            console.log('node', node)
            setOpenQRScanner(false)
          }}
          onRead={(node) => {
            switch (operation) {
              case 'CRYPTO_SEND':
                onCryptoSendQRCodeScan(node, selectedCurrency);
                break;
              case 'MONEYCLICK_USER_SEND':
                onMoneyClickUserSendQRCodeScan(node);
                break;
              case 'GIFT_CARD_REDEEEM':
                onGiftCardRedeemQRCodeScan(node);
                break;
              case 'USER_FOLLOW':
                onUserFollowQRCodeScan(node);
                break;
              case 'SETTINGS__KAIKAI_WEB':
                onSettingsKaikaiWebQRCodeScan(node);
                break;
            }
          }}
          ref={(node) => {
              this.scanner = node;
          }}
          showMarker={true}
          reactivateTimeout={300}
          markerStyle={{ borderColor: "white" }}
          vibrate={true}
        />
      */}
    </View >
  );

};

export default GiftCardRedeemScreen;
