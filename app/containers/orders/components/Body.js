//PRINCIPAL
import React from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    processColor,
    Dimensions,
    ScrollView,
    Button,
    RefreshControl,
} from 'react-native';
import { Tab, TabView, Avatar } from '@rneui/themed';
import { connect, Provider } from "react-redux";
import { useTheme } from 'react-native-paper';
import _ from 'lodash';
//STORES
import {
    indexStore
} from '../store'
import {
    authPersistedStore,
    navigateStore
} from '../../../main/store'
import { getMoneyMarketOffersStore } from '../../moneyMarket/store';
//ACTIONS
import {
    IS_LOADING, SET_SELECTED_ORDER
} from '../../../constants/action-types';
import { getMoneyMarketOffersAction } from '../../moneyMarket/actions';
//FUNCTIONS
import { decorateTimestamp } from '../../../main/functions';
//CONSTANTS
import currenciesParams from '../../../constants/currenciesParams';
//COMPONENTS
import ActionSheetConfirmation from '../../../main/components/ActionSheetConfirmation'
import ViewInstructions from '../../../main/components/ViewInstructions'
import ViewEmptyList from '../../../main/components/ViewEmptyList'


const INSTRUCTIONS = [
    { text: 'Orders are created from pair charts in the Financial section.', iconName: '' },
    { text: 'The graphs represent the market activity at the moment.', iconName: '' },
    { text: 'Select the pair and press the link to go to the Order Book.', iconName: '' },
    { text: 'Once you are in the order book you can see the sections for buying the green background and selling the red background.', iconName: '' },
    { text: 'Select the operation you wish to carry out and choose whether you accept the market price for the amount or you want to propose your own price.', iconName: '' },
    { text: 'The orders created at the market price are executed automatically and those at the price set by the user are presented for other users to take and will depend on the consent of the counterparty.', iconName: '' },
    { text: 'After setting the price and quantity, you must indicate the time that the order will be active. After that time has elapsed, the order will be closed automatically.', iconName: '' },
    { text: 'The user must take into account that he needs to have an available balance to generate the order.', iconName: '' },
    { text: 'For advanced trading users there is the option to add the order to a specific subscription. Once that order is added to a subscription, all subscribed users will be informed of the generated pair, price and trade type.', iconName: '' },
]

const getCurrency = (symbol, type) => {
    var currency = null
    Object.entries(currenciesParams).every(function (element, index) {
        if (type === 'ASSET' && symbol.startsWith(element[1].value)) {
            currency = element[1].value
            return false
        }
        if (type === 'BASE' && symbol.startsWith(element[1].value)) {
            currency = symbol.replace(element[1].value, '')
            return false
        }
        return true
    })
    return currency
}

const TabViewOrders = ({ data, old, isLoading, colors, actionSheetConfirmationCloseRef }) => {
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => {
                        indexStore.dispatch({ type: IS_LOADING, payload: true })
                        getMoneyMarketOffersStore.dispatch(
                            getMoneyMarketOffersAction(
                                authPersistedStore.getState().userNameState,
                                null,
                                null,
                                null,
                                old
                            )
                        )
                    }}
                    tintColor={navigateStore.getState().selectedColorState}
                    colors={[navigateStore.getState().selectedColorState]}
                />
            }
            persistentScrollbar={true}
        >
            {console.log(JSON.stringify(data))}
            {data.length === 0 ?
                <View>
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: 'blue',
                        }}
                    >
                        {'No data'}
                    </Text>
                    {!old &&
                        <>
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    color: 'blue',
                                    fontWeight: 'bold',
                                    marginTop: 10,
                                }}
                            >
                                Go to a specific Order Book below
                            </Text>
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    color: 'blue',
                                    fontWeight: 'bold',
                                    marginTop: 5,
                                }}
                            >
                                to create a new ORDER
                            </Text>
                        </>}
                </View>
                :
                <>
                    {data.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    padding: 10,
                                    marginBottom: 5,
                                    borderRadius: 10,
                                    backgroundColor: index % 2 === 1 ? colors.primaryBackground : colors.secundaryBackground,
                                }}
                            >
                                <View
                                    style={{
                                        //flex: 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: colors.text
                                        }}
                                    >
                                        {decorateTimestamp(item.timestamp)}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1.6,
                                        padding: 10
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                color: colors.text
                                            }}
                                        >
                                            Operation:
                                        </Text>
                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                color: item.operation === 'BUYING' ? '#71BD6A' : '#D14B5A'
                                            }}
                                        >
                                            {item.operation}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 5
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                color: colors.text
                                            }}
                                        >
                                            Market:
                                        </Text>
                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                color: colors.text,
                                            }}
                                        >
                                            {item.pair}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 5
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                color: colors.text
                                            }}
                                        >
                                            Amount:
                                        </Text>
                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                color: colors.text,
                                            }}
                                        >
                                            {Number(item.amount).toFixed(8)} {getCurrency(item.pair, 'ASSET')}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 5
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                color: colors.text
                                            }}
                                        >
                                            Price:
                                        </Text>
                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                color: colors.text,
                                            }}
                                        >
                                            {Number(item.price).toFixed(2)} {getCurrency(item.pair, 'BASE')}/{getCurrency(item.pair, 'ASSET')}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 0.8,
                                        alignItems: 'center'
                                    }}
                                >
                                    {!old &&
                                        <>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    indexStore.dispatch({ type: SET_SELECTED_ORDER, payload: item })
                                                    actionSheetConfirmationCloseRef.current?.setModalVisible(true);
                                                }}
                                                style={{
                                                    padding: 10,
                                                    borderWidth: 1,
                                                    borderRadius: 10,
                                                    borderColor: colors.border,
                                                    backgroundColor: colors.background
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: colors.text,
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    close
                                                </Text>
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    color: colors.text,
                                                    fontSize: 9,
                                                    marginTop: 10
                                                }}
                                            >
                                                {item.time} {item.timeUnit} left
                                            </Text>
                                        </>}
                                </View>
                            </View>
                        )
                    })}
                </>}
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        dataState: state.dataState,
        selectedTabState: state.selectedTabState,
        actionSheetConfirmationCloseRefState: state.actionSheetConfirmationCloseRefState,
        isLoadingState: state.isLoadingState,
        updateCountState: state.updateCountState
    };
};

const ConnectedComponent = ({
    dataState,
    selectedTabState,
    actionSheetConfirmationCloseRefState,
    isLoadingState,
    updateCountState
}) => {
    const { colors } = useTheme();
    return (
        <View style={{
            width: Dimensions.get('window').width * 0.95,
            alignSelf: 'center',
            height: '100%'
        }}>
            <TabView
                value={selectedTabState}
                //onChange={setIndex}
                animationType="spring"
            >
                <TabView.Item style={{ width: Dimensions.get('window').width * 0.95, padding: 10 }}>
                    {dataState.current !== undefined && dataState.current.length > 0 ?
                        <TabViewOrders
                            data={dataState.current}
                            old={false}
                            isLoading={isLoadingState}
                            colors={colors}
                            actionSheetConfirmationCloseRef={actionSheetConfirmationCloseRefState}
                        />
                        : !isLoadingState &&
                        <ViewInstructions
                            instructions={INSTRUCTIONS}
                            linkText={'Go back and select pair'}
                            linkTarget={'goBack__1'}
                            type={'STEPS'}
                            color={navigateStore.getState().selectedColorState}
                            width={Dimensions.get('window').width * 0.95}
                        />}
                </TabView.Item>
                <TabView.Item style={{ width: Dimensions.get('window').width * 0.95, padding: 10 }}>
                    {dataState.old !== undefined && dataState.old.length > 0 ?
                        <TabViewOrders
                            data={dataState.old}
                            old={true}
                            isLoading={isLoadingState}
                            colors={colors}
                        />
                        : !isLoadingState &&
                        < ViewEmptyList
                            operation={'ORDER_OLD'}
                            message={'There is no closed orders'}
                            color={colors.icon}
                            top={30}
                            position={'relative'}
                        />}
                </TabView.Item>
            </TabView>
            <ActionSheetConfirmation
                actionSheetConfirmationRef={actionSheetConfirmationCloseRefState}
                operation={'MONEY_MARKET_OFFER_CLOSE'}
                confirmationMessage={'Do you want to CLOSE this Order?'}
            />
        </View >
    )
};

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;