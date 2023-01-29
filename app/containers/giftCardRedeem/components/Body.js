//PRINCIPAL
import React from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Avatar } from '@rneui/themed';
import { connect } from "react-redux";
//FUNCTIONS
import { getRequire, openConfirmationModal } from '../../../main/functions'
//COMPONENTS
import Body_InputId from './Body_InputId'
import { navigateStore } from '../../../main/store';

const mapStateToProps = state => {
    return {
        idState: state.idState,
        typeState: state.typeState,
        selectedCurrencyState: state.selectedCurrencyState,
        amountState: state.amountState,
        commissionState: state.commissionState,
    };
};

const ConnectedComponent = ({
    idState,
    typeState,
    selectedCurrencyState,
    amountState,
    commissionState,
}) => (
    <View style={{
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.9,
        marginTop: 20
    }}>
        <View
            style={{
                alignSelf: 'center'
            }}
        >
            <Avatar
                size={150}
                rounded
                source={getRequire(typeState)}
                overlayContainerStyle={{
                    backgroundColor: 'white',
                }}
            />
        </View>
        <Body_InputId
            id={idState}
        />
        <TouchableOpacity
            style={{
                backgroundColor: navigateStore.getState().selectedColorState,
                marginTop: 20,
                borderRadius: 10
            }}
            onPress={() => {
                openConfirmationModal(
                    'GIFT_CARD_REDEEM',
                    [
                        { name: 'ID', value: idState, type: 'TEXT' },
                        { name: 'CURRENCY', value: selectedCurrencyState.value, type: 'TEXT' },
                        { name: 'AMOUNT', value: amountState, type: 'NUMBER' },
                        { name: 'TYPE', value: typeState, type: 'TEXT' },
                    ],
                    {
                        currency: selectedCurrencyState.value,
                        amount: amountState,
                        chargeType: typeState === 'BITCOINRECHARGE' ? 'GIFT_CARD_REDEEM_BR' : 'GIFT_CARD_REDEEM'
                    }
                );
            }}
        >
            <Text
                style={{
                    alignSelf: 'center',
                    color: 'white',
                    padding: 10
                }}
            >
                REDEEM
            </Text>
        </TouchableOpacity>
    </View>
);

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;