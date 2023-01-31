//PRINCIPAL
import React, { useEffect } from 'react';
import {
    View,
} from 'react-native';
import { compose } from 'redux';
//HOC
import { withColors } from '../../main/hoc';

const VerificationScreen = ({ navigation, route, colors }) => {

    useEffect(() => {
        console.log('VerificationScreen', route.params)
        /*const unsubscribe = navigation.addListener('focus', () => {       
            let redirect = false
            if (route.params !== undefined &&
                route.params.selectedVerificationType !== undefined) {
                getUserVerificationMessagesStore.dispatch(
                    getUserVerificationMessagesAction(
                        route.params.selectedVerificationType
                    )
                )
                let verificationTypeStatus = authPersistedStore.getState().configState.verifications[route.params.selectedVerificationType] === undefined
                    ? 'NEW' : authPersistedStore.getState().configState.verifications[route.params.selectedVerificationType].status
                indexStore.dispatch(
                    { type: SET_VERIFICATION_TYPE, payload: route.params.selectedVerificationType }
                );
                indexStore.dispatch(
                    { type: SET_VERIFICATION_TYPE_STATUS, payload: verificationTypeStatus }
                );
                if (verificationTypeStatus === 'NEW' || verificationTypeStatus === 'DELETED') {
                    getUserVerificationFieldsStore.dispatch(
                        getUserVerificationFieldsAction(route.params.selectedVerificationType)
                    );
                }
                if (verificationTypeStatus === 'OK' || verificationTypeStatus === 'ONE_DEPOSIT') {
                    redirect = true
                }
                if (verificationTypeStatus === 'PROCESSING' || verificationTypeStatus === 'NEW') {
                    refreshIntervalId = setInterval(() => {
                        getUserVerificationsStore.dispatch(
                            getUserVerificationsAction(
                                authPersistedStore.getState().userNameState,
                                null
                            )
                        )
                    }, 5000)
                }
            } else {
                redirect = true
            }
            if (redirect) {
                navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'redirect__1' } })
            }
        });
        return unsubscribe;*/
    }, []);

    return (
        <View style={{
            flex: 1
        }}>

        </View >
    );
};

export default React.memo(compose(withColors)(VerificationScreen));
