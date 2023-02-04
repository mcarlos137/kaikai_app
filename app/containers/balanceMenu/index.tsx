import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StackActions } from '@react-navigation/native';
//COMPONENTS
import Body_Option from './components/Body_Option'
import Body_Balance from './components/Body_Balance'
import Modal from './components/Modal'

const BalanceMenuScreen = ({ navigation, route }) => {

  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [buttons, setButtons] = useState<any[]>([])

  //EFFECTS
  useEffect(() => {
    console.log('BalanceMenuScreen', route.params)
  }, []);

  //PRINCIPAL RENDER
  return (
    <View style={{
      flex: 1
    }}>
      <Body_Balance
        currency={route.params.selectedCurrency}
      />
      {route.params.selectedCurrency.isCrypto
        ?
        <View style={{ marginBottom: 50, flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: "center",
            }}>
            <Body_Option
              iconName={'bank-transfer-out'}
              text={'Send'}
              onPress={() => navigation.dispatch(StackActions.push('CryptoSendScreen', { ...route.params }))}
            />
            <Body_Option
              iconName={'bank-transfer-in'}
              text={'Receive'}
              onPress={() => navigation.dispatch(StackActions.push('CryptoReceiveScreen', { ...route.params }))}
            />

          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: "center",
          }}>
            <Body_Option
              iconName={'exchange'}
              text={'Fast Change'}
              onPress={() => navigation.dispatch(StackActions.push('FastChangeScreen', { ...route.params }))}
            />
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: "center",
          }}>
            <Body_Option
              iconName={'cart-arrow-down'}
              text={'Buy'}
              onPress={() => navigation.dispatch(StackActions.push('CryptoBuyScreen', { ...route.params }))}
            />
            <Body_Option
              iconName={'cart-arrow-up'}
              text={'Sell'}
              onPress={() => navigation.dispatch(StackActions.push('CryptoSellScreen', { ...route.params }))}
            />
          </View>
        </View>
        :
        <View style={{ marginBottom: 50, flex: 1 }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: "center",
          }}>
            <Body_Option
              iconName={'bank-transfer-out'}
              text={'Send / Transfer'}
              onPress={() => {
                setModalTitle('Send / Transfer')
                setIsVisibleModal(true)
                setButtons([
                  {
                    id: 1,
                    title: 'To MoneyClick Users',
                    onPress: () => {
                      setIsVisibleModal(false)
                      navigation.dispatch(StackActions.push('MoneyClickUserSendScreen', { ...route.params }))
                    }
                  },
                  {
                    id: 2,
                    title: 'To Banks',
                    onPress: () => {
                      setIsVisibleModal(false)
                      /*
              if (
                  authPersistedStore.getState().configState.verifications['E'] !== undefined &&
                  authPersistedStore.getState().configState.verifications['E'].status === 'OK' &&
                  authPersistedStore.getState().configState.verifications['C'] === undefined) || (
                  authPersistedStore.getState().configState.verifications['C'] !== undefined &&
                  authPersistedStore.getState().configState.verifications['C'].status === 'OK'
                ) {
                navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'FiatBankTransferScreen', redirectToTarget: 'BalanceDetailsScreen' } });
              } else {
                let verificationType = 'E'
                if ((authPersistedStore.getState().configState.verifications['C'] !== undefined &&
                  authPersistedStore.getState().configState.verifications['C'].status === 'PROCESSING') ||
                  (authPersistedStore.getState().configState.verifications['C'] !== undefined &&
                    authPersistedStore.getState().configState.verifications['C'].status === 'FAIL')) {
                  verificationType = 'C'
                }
                navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'VerificationScreen', redirectToTarget: 'FiatBankTransfersScreen', selectedVerificationType: verificationType } });
              }*/
                      navigation.dispatch(StackActions.push('FiatBankTransfersScreen', { ...route.params }))
                    }
                  }]
                )
              }}
            />
            <Body_Option
              iconName={'bank-transfer-in'}
              text={'Receive / Deposit'}
              onPress={() => {
                setModalTitle('Receive / Deposit')
                setIsVisibleModal(true)
                setButtons([
                  {
                    id: 1,
                    title: 'Gift Card Redeem',
                    onPress: () => {
                      setIsVisibleModal(false)
                      navigation.dispatch(StackActions.push('GiftCardRedeemScreen', { ...route.params }))
                    }
                  },
                  {
                    id: 2,
                    title: 'From Banks',
                    onPress: () => {
                      setIsVisibleModal(false)
                      navigation.dispatch(StackActions.push('FiatBankDepositsScreen', { ...route.params }))
                      /*
                if (authPersistedStore.getState().configState.verifications['C'] !== undefined &&
                  authPersistedStore.getState().configState.verifications['C'].status === 'OK') {
                  navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'FiatBankDepositsScreen', redirectToTarget: 'BalanceDetailsScreen' } });
                } else {
                  navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'VerificationScreen', redirectToTarget: 'FiatBankDepositsScreen', selectedVerificationType: 'C' } });
                }*/
                    }
                  },
                  {
                    id: 3,
                    title: 'From MoneyClick Users',
                    onPress: () => {
                      setIsVisibleModal(false)
                      navigation.dispatch(StackActions.push('MoneyClickUserReceiveScreen', { ...route.params }))
                    }
                  }
                ])
              }}
            />
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: "center",
          }}>
            <Body_Option
              iconName={'bank-transfer-in'}
              text={'Fast Change'}
              onPress={() => navigation.dispatch(StackActions.push('FastChangeScreen', { ...route.params }))}
            />
          </View>
          {route.params.selectedCurrency.value === 'USD'
            ?
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: "center",
            }}>
              <Body_Option
                iconName={'point-of-sale'}
                text={'Merchant PoS'}
                onPress={() => navigation.dispatch(StackActions.push('FiatMerchantPoSScreen', { ...route.params }))}
              />
            </View>
            :
            <></>
          }
        </View>}
      <Modal isVisible={isVisibleModal} title={modalTitle} buttons={buttons} onPressClose={() => setIsVisibleModal(false)} />
    </View >
  );
};

export default React.memo(BalanceMenuScreen);
