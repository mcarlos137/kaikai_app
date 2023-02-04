//PRINCIPAL
import React, { ReactNode } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    GestureResponderEvent
} from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import { compose } from 'redux';
//HOC
import { withColors } from '../hoc';

type ActionSheetConfirmation_Props = {
    reference: any
    height: number
    confirmationMessage: string
    onPress: (event: GestureResponderEvent) => void
    additionalInput?: ReactNode
    colors: any
}

const Component = ({
    reference,
    height,
    confirmationMessage,
    onPress,
    additionalInput,
    colors
}: ActionSheetConfirmation_Props) => {

    //PRINCIPAL RENDER
    return (
        <ActionSheet
            ref={reference}
            containerStyle={{
                backgroundColor: colors.primaryBackground
            }}
        >
            <View
                style={{
                    alignSelf: 'center',
                    height: height,
                    //height: (operation === 'MONEY_CALL_CANCEL' || operation === 'MONEY_CALL_ACCEPT') ? 130 : 100,
                    marginTop: 15,
                    alignItems: 'center',
                    alignContent: 'center'
                }}
            >
                <Text
                    style={{
                        color: colors.text
                    }}
                >
                    {confirmationMessage}
                </Text>
                {additionalInput}
                {/*(operation === 'MONEY_CALL_CANCEL' || operation === 'MONEY_CALL_ACCEPT') &&
                    <TextInput
                        placeholder={'message'}
                        //value={address}
                        //maxLength={60}
                        onChangeText={(text) => {
                            moneyCallStore.dispatch(
                                {
                                    type: SET_MONEY_CALL_ACCEPT_CANCEL_MESSAGE,
                                    payload: text
                                });
                        }}
                        placeholderTextColor={"silver"}
                        style={{
                            marginTop: 10,
                            fontSize: 12,
                            color: colors.text,
                            backgroundColor: colors.secundaryBackground,
                            padding: 10,
                            borderRadius: 10,
                            width: Dimensions.get('window').width * 0.85,
                        }}
                    />
                    */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={onPress}
                        /*onPress={() => {
                            switch (operation) {
                                case 'MONEY_CALL_CANCEL':
                                    moneyCallChangeStatusStore.dispatch(
                                        moneyCallChangeStatusAction(
                                            moneyCallStore.getState().selectedMoneyCallState.id,
                                            'CANCELED',
                                            authPersistedStore.getState().userNameState,
                                            moneyCallStore.getState().acceptCancelMessageState,
                                            authPersistedStore.getState().userNameState === moneyCallStore.getState().selectedMoneyCallState.senderUserName ? moneyCallStore.getState().selectedMoneyCallState.receiverUserName : moneyCallStore.getState().selectedMoneyCallState.senderUserName 
                                        ))
                                    break
                                case 'MONEY_CALL_ACCEPT':
                                    moneyCallChangeStatusStore.dispatch(
                                        moneyCallChangeStatusAction(
                                            moneyCallStore.getState().selectedMoneyCallState.id,
                                            'ACCEPTED',
                                            authPersistedStore.getState().userNameState,
                                            moneyCallStore.getState().acceptCancelMessageState,
                                            authPersistedStore.getState().userNameState === moneyCallStore.getState().selectedMoneyCallState.senderUserName ? moneyCallStore.getState().selectedMoneyCallState.receiverUserName : moneyCallStore.getState().selectedMoneyCallState.senderUserName 
                                        ))
                                    break
                                
                                case 'MONEY_MARKET_OFFER_CLOSE':
                                    closeMoneyMarketOfferStore.dispatch(
                                        closeMoneyMarketOfferAction(
                                            authPersistedStore.getState().userNameState,
                                            orderStore.getState().selectedOrderState.pair,
                                            orderStore.getState().selectedOrderState.id,
                                            orderStore.getState().selectedOrderState.type
                                        ))
                                    break
                            }
                            actionSheetConfirmationRef.current?.setModalVisible(false);
                        }}*/
                        style={{
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: colors.getRandomMain(),
                        }}
                    >
                        <Text
                            style={{
                                color: 'white'
                            }}
                        >
                            OK
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            reference.current?.setModalVisible(false);
                        }}
                        style={{
                            padding: 10,
                            backgroundColor: 'transparent',
                            marginLeft: 5,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: colors.border,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.text,
                            }}
                        >
                            CLOSE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ActionSheet>
    )
};

export default React.memo(compose(withColors)(Component));
