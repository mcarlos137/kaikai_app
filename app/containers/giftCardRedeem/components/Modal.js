//PRINCIPAL
import React from 'react';
import { connect } from "react-redux";
//COMPONENTS
import Modal from '../../../main/components/Modal'
import { navigateStore } from '../../../main/store';

const getModalData = (
    idState,
    typeState,
    selectedCurrencyState,
    amountState,
    factorAmountState,
    commissionState,
) => {
    let data = [];
    data.push(
        {
            title: 'Gift Card ID:',
            type: 'TEXT',
            value: idState,
        }
    );
    data.push(
        {
            title: 'Gift Card Type:',
            type: 'TEXT',
            value: typeState,
        }
    );
    data.push(
        {
            title: 'Gift Card Value:',
            type: 'NUMERIC',
            value: amountState,
            valuePreffix: '',
            valueSuffix: selectedCurrencyState.value,
            valueDecimals: selectedCurrencyState.decimals
        }
    );

    if (commissionState.amount !== undefined && commissionState.amount !== 0) {
        data.push(
            {
                title: 'Commission:',
                type: 'NUMERIC',
                value: commissionState.amount,
                valuePreffix: '',
                valueSuffix: selectedTargetCurrencyState.value,
                valueDecimals: selectedTargetCurrencyState.decimals
            }
        );
    }
    if (typeState === 'BITCOINRECHARGE') {
        data.push(
            {
                title: 'Price:',
                type: 'NUMERIC',
                value: factorAmountState,
                valuePreffix: '1 ' + 'BTC' + ' =',
                valueSuffix: selectedCurrencyState.value,
                valueDecimals: selectedCurrencyState.decimals
            }
        );
        data.push(
            {
                title: 'Final Amount to Receive:',
                type: 'NUMERIC',
                value: ((amountState - commissionState.amount) / factorAmountState),
                valuePreffix: '',
                valueSuffix: 'BTC',
                valueDecimals: 8
            }
        );
    } else {
        data.push(
            {
                title: 'Final Amount to Receive:',
                type: 'NUMERIC',
                value: (amountState - commissionState.amount),
                valuePreffix: '',
                valueSuffix: selectedCurrencyState.value,
                valueDecimals: selectedCurrencyState.decimals
            }
        );
    }
    return data;
}

const mapStateToProps = state => {
    return {
        idState: state.idState,
        typeState: state.typeState,
        selectedCurrencyState: state.selectedCurrencyState,
        amountState: state.amountState,
        factorAmountState: state.factorAmountState,
        commissionState: state.commissionState,
        confirmationModalMessageState: state.confirmationModalMessageState,
        openModalState: state.openModalState,
    };
};

const ConnectedComponent = ({
    idState,
    typeState,
    selectedCurrencyState,
    amountState,
    factorAmountState,
    commissionState,
    confirmationModalMessageState,
    openModalState,
}) => (
    <Modal
        data={getModalData(
            idState,
            typeState,
            selectedCurrencyState,
            amountState,
            factorAmountState,
            commissionState,
        )}
        visible={openModalState}
        confirmationModalMessage={confirmationModalMessageState}
        color={navigateStore.getState().selectedColorState}
        operation={'GIFT_CARD_REDEEM'}
    />
);

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;
