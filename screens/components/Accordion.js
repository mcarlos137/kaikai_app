//PRINCIPAL
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion'
import { connect } from "react-redux";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/MaterialCommunityIcons';
//STORES
import {
    navigateStore,
    drawerStore,
    authPersistedStore
} from '../../app/main/store'
//ACTIONS
import {
    NAVIGATE,
    UPDATE_ACTIVE_SECTIONS
} from '../../app/constants/action-types'

const targetEventFiatBankTransfer = () => {
    if (
        (
            authPersistedStore.getState().configState.verifications['E'] !== undefined &&
            authPersistedStore.getState().configState.verifications['E'].status === 'OK' &&
            authPersistedStore.getState().configState.verifications['C'] === undefined)
        ||
        (
            authPersistedStore.getState().configState.verifications['C'] !== undefined &&
            authPersistedStore.getState().configState.verifications['C'].status === 'OK'
        )) {
        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'FiatBankTransfersScreen', redirectToTarget: 'BalanceDetailsScreen' } });
    } else {
        let verificationType = 'E'
        if ((authPersistedStore.getState().configState.verifications['C'] !== undefined &&
            authPersistedStore.getState().configState.verifications['C'].status === 'PROCESSING') ||
            (authPersistedStore.getState().configState.verifications['C'] !== undefined &&
                authPersistedStore.getState().configState.verifications['C'].status === 'FAIL')) {
            verificationType = 'C'
        }
        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'VerificationScreen', redirectToTarget: 'FiatBankTransfersScreen', selectedVerificationType: verificationType } });
    }
}

const targetEventFiatBankDeposits = () => {
    if (authPersistedStore.getState().configState.verifications['C'] !== undefined &&
        authPersistedStore.getState().configState.verifications['C'].status === 'OK') {
        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'FiatBankDepositsScreen', redirectToTarget: 'BalanceDetailsScreen' } });
    } else {
        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'VerificationScreen', redirectToTarget: 'FiatBankDepositsScreen', selectedVerificationType: 'C' } });
    }
}

const accordionDrawer = [
    //{ name: 'Home', icon: 'home-outline', target: 'popToTop', isNew: false, options: [] },
    { name: 'My User Data', icon: 'account-outline', target: 'UserDataScreen', isNew: false, options: [] },
    {
        name: 'Send/Transfer', icon: 'bank-transfer-out', options: [
            { name: 'To MoneyClick Users', target: 'MoneyClickUserSendScreen', isNew: false },
            { name: 'To Banks', targetEvent: () => targetEventFiatBankTransfer(), isNew: false },
        ]
    },
    {
        name: 'Receive/Deposit', icon: 'bank-transfer-in', options: [
            { name: 'From Banks', targetEvent: () => targetEventFiatBankDeposits(), isNew: false },
            { name: 'From MoneyClick Users', target: 'MoneyClickUserReceiveScreen', isNew: false },
        ]
    },
    {
        name: 'Crypto', icon: 'currency-btc', options: [
            { name: 'Send', target: 'CryptoSendScreen', isNew: false },
            { name: 'Receive', target: 'CryptoReceiveScreen', isNew: false },
            { name: 'Buy', target: 'CryptoBuyScreen', isNew: true },
            { name: 'Sell', target: 'CryptoSellScreen', isNew: true },
        ]
    },
    { name: 'Fast Change', icon: 'exchange', target: 'FastChangeScreen', isNew: false, options: [] },
    //{ name: 'USD Merchant PoS', icon: 'point-of-sale', target: 'FiatMerchantPoSScreen', isNew: true, options: [] },
    //{ name: 'Gift Cards', icon: 'gift-outline', target: 'GiftCardMenuScreen', isNew: true, options: [] },
    //{ name: 'Money Market', icon: 'chart-line', target: 'MoneyMarketScreen', isNew: true, options: [] },
    {
        name: 'Help', icon: 'help', options: [
            { name: 'Customer Support', target: 'CustomerSupportScreen', isNew: false },
            { name: 'Rates', target: 'ChargesScreen', isNew: false },
            { name: 'FAQs', target: 'FAQsScreen', isNew: false },
        ]
    },
];

const mapStateToProps = state => {
    return {
        activeSectionsState: state.activeSectionsState,
    };
};

const ConnectedComponent = ({
    activeSectionsState,
}) => (
    <Accordion
        style={{ borderColor: 'transparent' }}
        sections={accordionDrawer}
        activeSections={activeSectionsState}
        renderSectionTitle={(section) =>
            <View
            //style={styles.content}
            >
                <Text>{section.content}</Text>
            </View>
        }
        renderHeader={(section, i, isActive, sections) => (
            < View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                {section.options.length > 0
                    ?
                    <>
                        <IconIon
                            name={section.icon}
                            color={'grey'}
                            size={25}
                            style={{ paddingLeft: 17 }}
                        />
                        <Text style={{ color: 'grey', paddingLeft: 30 }}>{section.name}</Text>
                        {isActive ? (
                            <IconIon
                                name="chevron-up"
                                color={'grey'}
                                size={18}
                                style={{ paddingLeft: 30 }}
                            />
                        ) : (
                            <IconIon
                                name="chevron-down"
                                color={'grey'}
                                size={18}
                                style={{ paddingLeft: 30 }}
                            />
                        )}
                    </>
                    :
                    <>
                        {section.icon === 'exchange'
                            ?
                            <IconFontAwesome
                                name={section.icon}
                                color={'grey'}
                                size={25}
                                style={{ paddingLeft: 17 }}
                            />
                            :
                            <IconIon
                                name={section.icon}
                                color={'grey'}
                                size={25}
                                style={{ paddingLeft: 17 }}
                            />
                        }
                        <TouchableOpacity
                            onPress={() => {
                                navigateStore.dispatch({ type: NAVIGATE, payload: { target: section.target } });
                            }}
                        >
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={{ color: 'grey', paddingLeft: 30 }}>{section.name}</Text>
                                {section.isNew === true
                                    ?
                                    <IconIon
                                        name="new-box"
                                        color={'red'}
                                        size={20}
                                        style={{ paddingLeft: 10 }}
                                    />
                                    :
                                    null
                                }
                            </View>
                        </TouchableOpacity>

                    </>
                }
            </View >
        )}
        renderContent={(section) => (
            <>
                {section.options.map((section, key) => {
                    return (
                        <TouchableOpacity
                            key={key}
                            style={{
                                marginTop: 10
                            }}
                            onPress={() => {
                                if (section.targetEvent !== undefined) {
                                    section.targetEvent()
                                } else {
                                    navigateStore.dispatch({ type: NAVIGATE, payload: { target: section.target } });
                                }
                            }}
                        >
                            <View style={{ flexDirection: 'row' }} >
                                <IconIon
                                    name="chevron-right"
                                    color={'grey'}
                                    size={20}
                                    style={{ paddingLeft: 40 }}
                                />
                                <Text style={{ color: 'grey', paddingLeft: 10 }}>{section.name}</Text>
                                {section.isNew === true
                                    ?
                                    <IconIon
                                        name="new-box"
                                        color={'red'}
                                        size={20}
                                        style={{ paddingLeft: 10 }}
                                    />
                                    :
                                    null
                                }
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </>
        )}
        onChange={(activeSections) => {
            drawerStore.dispatch({ type: UPDATE_ACTIVE_SECTIONS, payload: activeSections });
        }}
    />
);

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;