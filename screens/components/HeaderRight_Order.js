import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import IconIon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
//STORES
import { indexStore as orderStore } from '../../app/containers/order/store';
import { getMoneyMarketOffersStore } from '../../app/containers/moneyMarket/store';
import { authPersistedStore, navigateStore } from '../../app/main/store';
//ACTIONS
import { NAVIGATE, SET_SELECTED_TAB } from '../../app/constants/action-types';
import { getMoneyMarketOffersAction } from '../../app/containers/moneyMarket/actions';

const mapStateToProps = state => {
    return {
        selectedTabState: state.selectedTabState,
    };
};

const ConnectedComponent = ({
    selectedTabState,
}) => (
    <View
        style={{
            flexDirection: "row",
            marginRight: 10
        }}
    >
        <TouchableOpacity
            onPress={() => {
                orderStore.dispatch({type: SET_SELECTED_TAB, payload: 0})
            }}
            style={{
                padding: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: selectedTabState === 0 ? navigateStore.getState().selectedColorState : 'white',
                backgroundColor: selectedTabState === 0 ? 'white' : navigateStore.getState().selectedColorState,
                alignSelf: 'center'
            }}
        >
            <Text
                style={{
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: selectedTabState === 0 ? navigateStore.getState().selectedColorState : 'white',
                }}
            >
                current
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
                orderStore.dispatch({type: SET_SELECTED_TAB, payload: 1})
                getMoneyMarketOffersStore.dispatch(
                    getMoneyMarketOffersAction(
                      authPersistedStore.getState().userNameState,
                      null,
                      null,
                      null,
                      true
                    )
                  )
            }}
            style={{
                padding: 5,
                marginLeft: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: selectedTabState === 1 ? navigateStore.getState().selectedColorState : 'white',
                backgroundColor: selectedTabState === 1 ? 'white' : navigateStore.getState().selectedColorState,
                alignSelf: 'center'
            }}
        >
            <Text
                style={{
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: selectedTabState === 1 ? navigateStore.getState().selectedColorState : 'white',
                }}
            >
                old
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
                navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'OrdersBookScreen' } });
            }}
            style={{
                marginLeft: 10
            }}
        >
            <IconIon
                name="ios-add"
                size={30}
                color={'white'}
            />
        </TouchableOpacity>
    </View>
);

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;