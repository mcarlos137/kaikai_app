//PRINCIPAL
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
//import { Provider } from "react-redux";
//STORES
/*import { indexStore as chatRoomStore, setNavigationOptionsStore } from "../app/containers/chatRoom/store";
import { indexStore as broadcastingEpisodeTrailerStore } from "../app/containers/broadcastingEpisodeTrailer/store";
import { indexStore as userDataGalleryStore } from "../app/containers/userDataGallery/store";
import { indexStore as orderStore } from "../app/containers/order/store";
import { navigateStore } from "../app/main/store";*/
//ACTIONS
/*import {
  NAVIGATE,
  OPEN_MODAL,
  SET_SELECTED_TAB,
  UPDATE_USER_DATA_GALLERY_DATA,
} from "../app/constants/action-types";*/
//COMPONENTS
//import HeaderRight_Order from './components/HeaderRight_Order'
//SCREENS
/*

import WalletScreen from "../app/containers/wallet";
import DebitCardNewPinScreen from "../app/containers/debitCardNewPin";
import CashScreen from "../app/containers/cash";
import MoneyCallCommentsScreen from "../app/containers/moneyCallComments";
import MoneyCallRatingScreen from "../app/containers/moneyCallRating";
import MoneyCallBlockedUsersScreen from "../app/containers/moneyCallBlockedUsers";
import InvestmentScreen from "../app/containers/investment";
import InvestmentAvailableScreen from "../app/containers/investmentAvailable";
import InvestmentAddScreen from "../app/containers/investmentAdd";
import InvestmentDetailScreen from "../app/containers/investmentDetail";
import FiatMerchantPoSScreen from "../app/containers/fiatMerchantPoS";
import GiftCardBuyScreen from "../app/containers/giftCardBuy";
import GiftCardScreen from "../app/containers/giftCard";
import UserDataOthersScreen from "../app/containers/userDataOthers";
import UserDataGalleryViewScreen from "../app/containers/userDataGalleryView";
import UserDataFindScreen from "../app/containers/userDataFind";
import ChatScreen from "../app/containers/chat";
import OrderScreen from "../app/containers/order";
import LiveStreamingCreateScreen from "../app/containers/liveStreamingCreate";
import LiveStreamingScreen from "../app/containers/liveStreaming";
import LiveStreamingCategoryScreen from "../app/containers/liveStreamingCategory";
import LiveStreamingDetailsScreen from "../app/containers/liveStreamingDetails";
import CameraDataScreen from "../app/containers/cameraData";
import SubscriptionJoinScreen from "../app/containers/subscriptionJoin";
import BroadcastingScreen from "../app/containers/broadcasting";
import BroadcastingCreateScreen from "../app/containers/broadcastingCreate";
import BroadcastingEpisodeTrailerScreen from "../app/containers/broadcastingEpisodeTrailer";
import BroadcastingWatchScreen from "../app/containers/broadcastingWatch";
import BroadcastingDetailsScreen from "../app/containers/broadcastingDetails";
import ShortsCommentsScreen from "../app/containers/shortsComments";
import DonationSendScreen from "../app/containers/donationSend";

*/

import SplashScreen from "../app/containers/splash";
import MainInfoScreen from "../app/containers/mainInfo";

import SignInScreen from "../app/containers/signIn";
import SignUpScreen from "../app/containers/signUp";
import MFACodeScreen from "../app/containers/mfaCode";
import ForgotPasswordScreen from "../app/containers/forgotPassword";
import ForgotPasswordProcessScreen from "../app/containers/forgotPasswordProcess";
import SignUpProcessScreen from "../app/containers/signUpProcess";
import SignInProcessScreen from "../app/containers/signInProcess";

import BalanceDetailsScreen from "../app/containers/balanceDetails";
import BalanceMenuScreen from "../app/containers/balanceMenu";
import BalanceMovementsScreen from "../app/containers/balanceMovements";
import BalanceMovementDetailsScreen from "../app/containers/balanceMovementDetails";

import FAQsScreen from "../app/containers/faqs";
import CustomerSupportScreen from "../app/containers/customerSupport";
import ChargesScreen from "../app/containers/charges";

import CryptoBuyScreen from "../app/containers/cryptoBuy";
import CryptoReceiveScreen from "../app/containers/cryptoReceive";
import CryptoSellScreen from "../app/containers/cryptoSell";
import CryptoSendScreen from "../app/containers/cryptoSend";

import FastChangeScreen from "../app/containers/fastChange";

import MoneyMarketScreen from "../app/containers/moneyMarket";
import OrderBookScreen from "../app/containers/orderBook";

import SettingsScreen from "../app/containers/settings";

import MoneyClickUserReceiveScreen from "../app/containers/moneyClickUserReceive";
import MoneyClickUserSendScreen from "../app/containers/moneyClickUserSend";

import GiftCardRedeemScreen from "../app/containers/giftCardRedeem";

import CameraBridgeScreen from "../app/containers/cameraBridge";
import CameraScreen from "../app/containers/camera";
import PermissionsScreen from "../app/containers/permissions";

import CameraStreamScreen from "../app/containers/cameraStream";

import FiatBankDepositsScreen from "../app/containers/fiatBankDeposits";
import FiatBankDepositsCreateScreen from "../app/containers/fiatBankDepositsCreate";
import FiatBankDepositsDetailsScreen from "../app/containers/fiatBankDepositsDetails";
import FiatBankDepositsPayScreen from "../app/containers/fiatBankDepositsPay";
import FiatBankTransfersScreen from "../app/containers/fiatBankTransfers";
import FiatBankPaymentsScreen from "../app/containers/fiatBankPayments";

import NotificationsScreen from "../app/containers/notifications";

import ContactsScreen from "../app/containers/contacts";

import ShortsScreen from "../app/containers/shorts";
import ShortsCreateScreen from "../app/containers/shortsCreate";
import ShortsVideoScreen from "../app/containers/shortsVideo";

import MoneyCallsScreen from "../app/containers/moneyCalls";
import MoneyCallsCreateScreen from "../app/containers/moneyCallsCreate";
import MoneyCallsMessagesScreen from "../app/containers/moneyCallsMessages";

import UserDataGalleryScreen from "../app/containers/userDataGallery";

import VerificationScreen from "../app/containers/verification";

import DigitalBusinessScreen from "../app/containers/digitalBusiness"
import DigitalBusinessDetailsScreen from "../app/containers/digitalBusinessDetails"

import DebitCardsScreen from "../app/containers/debitCards";
import DebitCardsRequestScreen from "../app/containers/debitCardsRequest";
import DebitCardsInfoScreen from "../app/containers/debitCardsInfo";
import DebitCardsBalanceMovementsScreen from "../app/containers/debitCardsBalanceMovements";
import DebitCardsBalanceMovementDetailsScreen from "../app/containers/debitCardsBalanceMovementDetails";
import DebitCardsAddSubstractBalanceScreen from "../app/containers/debitCardsAddSubstractBalance";

import ChatScreen from "../app/containers/chat";
import ChatRoomScreen from "../app/containers/chatRoom";

import MainTabScreen from "./MainTabScreen";

import { useTheme } from "react-native-paper";

const RootStack = createStackNavigator();

const RootStackScreen = ({ }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  return (
    <RootStack.Navigator
      screenListeners={{
        state: (e) => {
          //navigateStore.getState().currentScreenState = e.data.state.routes[e.data.state.routes.length - 1].name
        },
      }}
    >
      <RootStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MainInfoScreen"
        component={MainInfoScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MainTabScreen"
        component={MainTabScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="BalanceDetailsScreen"
        component={BalanceDetailsScreen}
        options={getOptions({ title: "Balance Details", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="BalanceMenuScreen"
        component={BalanceMenuScreen}
        options={getOptions({ title: "Operations", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="CryptoBuyScreen"
        component={CryptoBuyScreen}
        options={getOptions({ title: "Buy Crypto", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="FAQsScreen"
        component={FAQsScreen}
        options={getOptions({ title: "FAQs", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="MoneyMarketScreen"
        component={MoneyMarketScreen}
        options={getOptions({ title: "Exchange", backgroundColor: colors.getRandomMain(), headerRight: <HeaderRightMoneyMarket navigation={navigation} /> })}
      />
      <RootStack.Screen
        name="OrderBookScreen"
        component={OrderBookScreen}
        options={getOptions({ title: "Order Book", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="BalanceMovementsScreen"
        component={BalanceMovementsScreen}
        options={getOptions({ title: "Balance Movements", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={getOptions({ title: "Settings", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="ChargesScreen"
        component={ChargesScreen}
        options={getOptions({ title: "Rates", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="CryptoReceiveScreen"
        component={CryptoReceiveScreen}
        options={getOptions({ title: "Receive Crypto", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="CryptoSellScreen"
        component={CryptoSellScreen}
        options={getOptions({ title: "Sell Crypto", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="CryptoSendScreen"
        component={CryptoSendScreen}
        options={getOptions({ title: "Send Crypto", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="CustomerSupportScreen"
        component={CustomerSupportScreen}
        options={getOptions({ title: "Customer Support", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="FastChangeScreen"
        component={FastChangeScreen}
        options={getOptions({ title: "Fast Change", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="MoneyClickUserReceiveScreen"
        component={MoneyClickUserReceiveScreen}
        options={getOptions({ title: "MoneyClick User Receive", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="GiftCardRedeemScreen"
        component={GiftCardRedeemScreen}
        options={getOptions({ title: "Gift Card Redeem", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="CameraBridgeScreen"
        component={CameraBridgeScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="PermissionsScreen"
        component={PermissionsScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MoneyClickUserSendScreen"
        component={MoneyClickUserSendScreen}
        options={getOptions({ title: "MoneyClick User Send", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="FiatBankDepositsScreen"
        component={FiatBankDepositsScreen}
        options={getOptions({ title: "Bank Deposits", backgroundColor: colors.getRandomMain(), headerRight: <HeaderRightFiatBankDeposits navigation={navigation} /> })}
      />
      <RootStack.Screen
        name="FiatBankDepositsCreateScreen"
        component={FiatBankDepositsCreateScreen}
        options={getOptions({ title: "Bank Deposits Create", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="FiatBankDepositsDetailsScreen"
        component={FiatBankDepositsDetailsScreen}
        options={getOptions({ title: "Bank Deposit Details", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="FiatBankDepositsPayScreen"
        component={FiatBankDepositsPayScreen}
        options={getOptions({ title: "Bank Deposit Pay", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="FiatBankTransfersScreen"
        component={FiatBankTransfersScreen}
        options={getOptions({ title: "Bank Transfer", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="FiatBankPaymentsScreen"
        component={FiatBankPaymentsScreen}
        options={getOptions({ title: "Bank Payments", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={getOptions({ title: "Inbox", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="BalanceMovementDetailsScreen"
        component={BalanceMovementDetailsScreen}
        options={getOptions({ title: "Transaction Details", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={getOptions({ title: "Select Contact", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MFACodeScreen"
        component={MFACodeScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ForgotPasswordProcessScreen"
        component={ForgotPasswordProcessScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignUpProcessScreen"
        component={SignUpProcessScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignInProcessScreen"
        component={SignInProcessScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ShortsScreen"
        component={ShortsScreen}
        options={getOptions({ title: "Shorts", backgroundColor: colors.getRandomMain(), headerRight: <HeaderRightShorts navigation={navigation} /> })}
      />
      <RootStack.Screen
        name="ShortsCreateScreen"
        component={ShortsCreateScreen}
        options={getOptions({ title: "Shorts Create", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="ShortsVideoScreen"
        component={ShortsVideoScreen}
        options={getOptions({ title: "Shorts Video", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="MoneyCallsScreen"
        component={MoneyCallsScreen}
        options={getOptions({ title: "Paid Calls", backgroundColor: colors.getRandomMain(), headerRight: <HeaderRightMoneyCalls navigation={navigation} /> })}
      />
      <RootStack.Screen
        name="MoneyCallsCreateScreen"
        component={MoneyCallsCreateScreen}
        options={getOptions({ title: "Call Schedule", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="MoneyCallsMessagesScreen"
        component={MoneyCallsMessagesScreen}
        options={getOptions({ title: "Paid Calls Messages", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="UserDataGalleryScreen"
        component={UserDataGalleryScreen}
        options={getOptions({ title: "Gallery", backgroundColor: colors.getRandomMain(), headerRight: <></> })}
      />
      <RootStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={getOptions({ title: "Chat", backgroundColor: '#009387', headerRight: <HeaderRightChat /> })}
      />
      <RootStack.Screen
        name="DebitCardsScreen"
        component={DebitCardsScreen}
        options={getOptions({ title: "Debit Cards", backgroundColor: colors.getRandomMain(), headerRight: <HeaderRightDebitCards navigation={navigation} /> })}
      />
      <RootStack.Screen
        name="DebitCardsRequestScreen"
        component={DebitCardsRequestScreen}
        options={getOptions({ title: "Debit Card Request", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="DebitCardsInfoScreen"
        component={DebitCardsInfoScreen}
        options={getOptions({ title: "Debit Card Info", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="DebitCardsBalanceMovementsScreen"
        component={DebitCardsBalanceMovementsScreen}
        options={getOptions({ title: "Debit Card Balance Movements", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="DebitCardsBalanceMovementDetailsScreen"
        component={DebitCardsBalanceMovementDetailsScreen}
        options={getOptions({ title: "Debit Card Balance Movements Details", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="DebitCardsAddSubstractBalanceScreen"
        component={DebitCardsAddSubstractBalanceScreen}
        options={getOptions({ title: "Debit Card Add - Subsctract Balance", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="DigitalBusinessScreen"
        component={DigitalBusinessScreen}
        options={getOptions({ title: "Digital Business", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="DigitalBusinessDetailsScreen"
        component={DigitalBusinessDetailsScreen}
        options={getOptions({ title: "Digital Business Details", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
        options={getOptions({ title: "Verification", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={getOptions({ title: "ChatRoom", backgroundColor: colors.getRandomMain() })}
      />
      <RootStack.Screen
        name="CameraStreamScreen"
        component={CameraStreamScreen}
        options={{ headerShown: false }}
      />

      {/*
    <RootStack.Screen
      name="DebitCardNewPinScreen"
      component={DebitCardNewPinScreen}
      options={getOptions("Debit Cards New PIN", "#694fad")}
    />
        
    <RootStack.Screen
      name="CashScreen"
      component={CashScreen}
      options={getOptions("Cash Locator", "#694fad")}
    />
    <RootStack.Screen
      name="MoneyCallCommentsScreen"
      component={MoneyCallCommentsScreen}
      options={getOptions("Paid Calls Comments", "#d02860")}
    />
    <RootStack.Screen
      name="MoneyCallRatingScreen"
      component={MoneyCallRatingScreen}
      options={getOptions("Call Finished", "#d02860")}
    />
    <RootStack.Screen
      name="MoneyCallBlockedUsersScreen"
      component={MoneyCallBlockedUsersScreen}
      options={getOptions("Call Blocked Users", "#d02860")}
    />
    <RootStack.Screen
      name="GiftCardBuyScreen"
      component={GiftCardBuyScreen}
      options={getOptions("Gift Card Buy", "#694fad")}
    />
    <RootStack.Screen
      name="GiftCardScreen"
      component={GiftCardScreen}
      options={getOptions("My Gift Cards", "#694fad")}
    />
    <RootStack.Screen
      name="UserDataOthersScreen"
      component={UserDataOthersScreen}
      options={getOptions("User Data", "#f5551b")}
    />
    <RootStack.Screen
      name="UserDataGalleryViewScreen"
      component={UserDataGalleryViewScreen}
      options={getOptions("User Gallery View", "#f5551b")}
    />
    <RootStack.Screen
      name="UserDataFindScreen"
      component={UserDataFindScreen}
      options={getOptions("User Find", "#f5551b")}
    />
    <RootStack.Screen
      name="FiatMerchantPoSScreen"
      component={FiatMerchantPoSScreen}
      options={getOptions("USD Merchant PoS", "#694fad")}
    />
    
    <RootStack.Screen
      name="OrderScreen"
      component={OrderScreen}
      options={getOptions("Order", "#694fad", "ORDER")}
    />
    <RootStack.Screen
      name="LiveStreamingScreen"
      component={LiveStreamingScreen}
      options={getOptions("My Live Streamings", "#1f65ff", "LIVE_STREAMING")}
    />
    <RootStack.Screen
      name="LiveStreamingCreateScreen"
      component={LiveStreamingCreateScreen}
      options={getOptions("Live Streaming Create", "#1f65ff")}
    />
    <RootStack.Screen
      name="LiveStreamingDetailsScreen"
      component={LiveStreamingDetailsScreen}
      options={getOptions("Live Streaming Details", "#1f65ff")}
    />
    <RootStack.Screen
      name="LiveStreamingCategoryScreen"
      component={LiveStreamingCategoryScreen}
      options={getOptions("Live Streaming Category", "#1f65ff")}
    />
    <RootStack.Screen
      name="CameraDataScreen"
      component={CameraDataScreen}
      options={{ headerShown: false }}
    //options={getOptions('', '#1f65ff', 'CHAT_ROOM')}
    />
    <RootStack.Screen
      name="SubscriptionJoinScreen"
      component={SubscriptionJoinScreen}
      options={getOptions("Subscribe", "#694fad")}
    />
    <RootStack.Screen
      name="BroadcastingScreen"
      component={BroadcastingScreen}
      options={getOptions("Podcasts/TV shows", "#d02860", "BROADCASTING")}
    />
    <RootStack.Screen
      name="BroadcastingCreateScreen"
      component={BroadcastingCreateScreen}
      options={getOptions("Podcast/TV show Create", "#d02860")}
    />
    <RootStack.Screen
      name="BroadcastingEpisodeTrailerScreen"
      component={BroadcastingEpisodeTrailerScreen}
      options={getOptions("Podcasts/TV shows Episode & Trailer", "#d02860", "BROADCASTING_EPISODE_TRAILER")}
    />
    <RootStack.Screen
      name="BroadcastingWatchScreen"
      component={BroadcastingWatchScreen}
      options={getOptions("", "#d02860")}
    />
    <RootStack.Screen
      name="BroadcastingDetailsScreen"
      component={BroadcastingDetailsScreen}
      options={getOptions("", "#d02860")}
    />
    <RootStack.Screen
      name="ShortsCommentsScreen"
      component={ShortsCommentsScreen}
      options={getOptions("Shorts Comments", "#d02860")}
    />
    <RootStack.Screen
      name="DonationSendScreen"
      component={DonationSendScreen}
      options={getOptions("Donation Send", "#d02860")}
    />
    <RootStack.Screen
      name="InvestmentScreen"
      component={InvestmentScreen}
      options={getOptions("Investment Returns", "#694fad", "INVESTMENT")}
    />
    <RootStack.Screen
      name="InvestmentAvailableScreen"
      component={InvestmentAvailableScreen}
      options={getOptions("Investment Available", "#694fad")}
    />
    <RootStack.Screen
      name="InvestmentAddScreen"
      component={InvestmentAddScreen}
      options={getOptions("Investment Add", "#694fad")}
    />
    <RootStack.Screen
      name="InvestmentDetailScreen"
      component={InvestmentDetailScreen}
      options={getOptions("Investment Detail", "#694fad")}
  />*/}
    </RootStack.Navigator>
  )
};

export default RootStackScreen;

const getOptions = ({ title, backgroundColor, headerRight = <></>, headerTitleAlign = 'center' }) => {
  return {
    title: title,
    //headerTransparent: true,
    headerStyle: { backgroundColor: backgroundColor },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
    headerTitleAlign: headerTitleAlign,
    headerBackTitle: 'Back',
    headerRight: () => headerRight,
    /*headerRight: () => (
      <>
        {type !== undefined && type === "CHAT_ROOM" ? (
          <View
            style={{
              flexDirection: "row",
              marginRight: 10
            }}
          >
            
        ) : type !== undefined &&
          (type === "BROADCASTING" ||
            type === "BROADCASTING_EPISODE_TRAILER" ||
            type === "DEBIT_CARD" ||
            type === "FIAT_BANK_DEPOSIT" ||
            type === 'LIVE_STREAMING' ||
            (type === "USER_DATA_GALLERY" &&
              userDataGalleryStore.getState().addAllowedState)) ? (
          <View
            style={{
              flexDirection: "row",
              marginRight: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                switch (type) {
                  case "BROADCASTING":
                    navigateStore.dispatch({
                      type: NAVIGATE,
                      payload: { target: "BroadcastingCreateScreen" },
                    });
                    break;
                  case "SHORTS":
                    navigateStore.dispatch({
                      type: NAVIGATE,
                      payload: { target: "ShortsCreateScreen" },
                    });
                    break;
                  case "BROADCASTING_EPISODE_TRAILER":
                    navigateStore.dispatch({
                      type: NAVIGATE,
                      payload: { target: "BroadcastingCreateScreen" },
                    });
                    break;
                  case "LIVE_STREAMING":
                    navigateStore.dispatch({
                      type: NAVIGATE,
                      payload: { target: "LiveStreamingCreateScreen" },
                    });
                    break;
                  case "DEBIT_CARD":
                    navigateStore.dispatch({
                      type: NAVIGATE,
                      payload: { target: "DebitCardRequestScreen" },
                    });
                    break;
                  case "FIAT_BANK_DEPOSIT":
                    navigateStore.dispatch({
                      type: NAVIGATE,
                      payload: { target: "FiatBankDepositCreateScreen" },
                    });
                    break;
                  case 'LIVE_STREAMING':
                    navigateStore.dispatch({
                      type: NAVIGATE,
                      payload: { target: "LiveStreamingCreateScreen" },
                    });
                    break
                  case "USER_DATA_GALLERY":
                    userDataGalleryStore.getState().actionSheetDocumentRefState.current?.setModalVisible(true);
                    userDataGalleryStore.dispatch({ type: UPDATE_USER_DATA_GALLERY_DATA, });
                    break;
                }
              }}
              style={{
                marginRight: 10
              }}
            >
              <Ionicons
                name="ios-add"
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        ) : type !== undefined && type === "MONEY_CALL" ? (
          
        ) : null}
      </>
    ),*/
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
};



const HeaderRightMoneyMarket = ({ navigation }) => {
  const route = useRoute()
  return (
    <View
      style={{
        flexDirection: "row",
        marginRight: 10
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.push('OrderBookScreen', { ...route.params }))
        }}
        style={{
          marginRight: 15
        }}
      >
        <Ionicons
          name="ios-add"
          size={26}
          color={'white'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.push('OrderScreen', { ...route.params }))
        }}
      >
        <Ionicons
          name="ios-albums"
          size={26}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  )
}

const HeaderRightFiatBankDeposits = ({ navigation }) => {
  const route = useRoute()
  return (
    <View
      style={{
        flexDirection: "row",
        marginRight: 10
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.push('FiatBankDepositCreateScreen', { ...route.params }))
        }}
        style={{
          marginRight: 10
        }}
      >
        <Ionicons
          name="ios-add"
          size={26}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  )
}

const HeaderRightShorts = ({ navigation }) => {
  const route = useRoute()
  return (
    <View
      style={{
        flexDirection: "row",
        marginRight: 10
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.push('ShortsCreateScreen', { ...route.params }))
        }}
        style={{
          marginRight: 10
        }}
      >
        <Ionicons
          name="ios-add"
          size={26}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  )
}

const HeaderRightMoneyCalls = ({ navigation }) => {
  const route = useRoute()
  return (
    <View
      style={{
        flexDirection: "row",
        marginRight: 10
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.push('MoneyCallsBlockedUsersScreen', { ...route.params }))
        }}
        style={{
          marginRight: 15,
        }}
      >
        <Ionicons
          name="ios-eye-off"
          size={30}
          color={'white'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.push('MoneyCallsCreateScreen', { ...route.params }))
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
}

const HeaderRightChat = ({ }) => {
  const route = useRoute()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        justifyContent: 'center'
      }}
    >
      <Image
        style={{
          width: 100,
          height: 30,
        }}
        source={require("../assets/logo5.png")}
      />
    </View>
  )
}

const HeaderRightDebitCards = ({ navigation }) => {
  const route = useRoute()
  return (
    <View
      style={{
        flexDirection: "row",
        marginRight: 10
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.push('DebitCardsRequestScreen', { ...route.params }))
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
}
