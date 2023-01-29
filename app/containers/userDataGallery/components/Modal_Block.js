import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
//STORES
import {
  navigateStore,
  visibleStore,
  authPersistedStore
} from '../../../main/store';
//ACTIONS
import {
  NAVIGATE,
  OPEN_MODAL,
  VISIBLE
} from '../../../constants/action-types';
import { indexStore } from '../store';

const mapStateToProps = state => {
  return {
    openModalState: state.openModalState,
    subscriptionDetailsState: state.subscriptionDetailsState
  };
};

const ConnectedComponent = ({ openModalState, subscriptionDetailsState }) => (
  <Modal
    transparent={true}
    isVisible={openModalState}
    style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
    backdropColor={'#000'}
    backdropOpacity={0.9}
    animationIn='slideInRight'
    animationOut='slideOutLeft'
    animationInTiming={500}
    animationOutTiming={500}
    backdropTransitionInTiming={500}
    backdropTransitionOutTiming={500}
  >
    <View
      style={{
        height: Dimensions.get('window').height * 0.9,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      }}
    >
      <TouchableOpacity
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 10,
          padding: 10
        }}
        onPress={() => {
          indexStore.dispatch({ type: OPEN_MODAL, payload: false })
          navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'redirect__1' } })
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: 'gray'
          }}
        >
          go back
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderColor: navigateStore.getState().selectedColorState,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: navigateStore.getState().selectedColorState,
          padding: 10,
          marginLeft: 10,
          alignItems: 'center'
        }}
        onPress={() => {
          indexStore.dispatch({ type: OPEN_MODAL, payload: false })
          navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'SubscriptionJoinScreen', selectedSubscriptionDetails: subscriptionDetailsState } })
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 3
          }}
        >
          Subscribe
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          {subscriptionDetailsState.subscriptionPrice} USD/month
        </Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;
