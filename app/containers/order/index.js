//PRINCIPAL
import React from 'react';
import { View, } from 'react-native';
import { Provider } from "react-redux";
//STORES
import {
  indexStore
} from './store'
import { authPersistedStore } from '../../main/store';
import { getMoneyMarketOffersStore } from '../moneyMarket/store';
//ACTIONS
import { getMoneyMarketOffersAction } from '../moneyMarket/actions';
//SUBSCRIPTION
import { subscribeCloseMoneyMarketOfferStore, subscribeGetMoneyMarketOffersStore } from '../moneyMarket/actions/subscriptions';
//COMPONENTS
import Body from './components/Body'

const OrderScreen = ({ navigation, route }) => {

  var unsubscribeCloseMoneyMarketOfferStore
  var unsubscribeGetMoneyMarketOffersStore

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('FOCUS ON ORDER')
      //START SUBSCRIPTIONS
      unsubscribeCloseMoneyMarketOfferStore = subscribeCloseMoneyMarketOfferStore()
      unsubscribeGetMoneyMarketOffersStore = subscribeGetMoneyMarketOffersStore()
      //FOCUS ACTIONS
      navigation.setOptions({
        headerStyle: { backgroundColor: route.params.selectedColor },
      })
      getMoneyMarketOffersStore.dispatch(
        getMoneyMarketOffersAction(
          authPersistedStore.getState().userNameState,
          null,
          null,
          null,
          false
        )
      )
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('OUT OF ORDER')
      unsubscribeAll();
    });
    return unsubscribe;
  }, [navigation]);

  const unsubscribeAll = () => {
    unsubscribeCloseMoneyMarketOfferStore()
    unsubscribeGetMoneyMarketOffersStore()
  };

  return (
    <View style={{
      flex: 1
    }}>
      <Provider store={indexStore} >
        <Body />
      </Provider>
    </View >
  );
};

export default OrderScreen;
