//PRINCIPAL
import {
    Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
//STORES
import {
    indexStore,
    startUserVerificationStore,
    addUserAttachmentStore,
    addUserInfoStore,
    processVerificationStore,
    startUserVerificationEmailStore
} from '../store'
import {
    authPersistedStore,
    navigateStore
} from '../../../main/store';
//ACTIONS
import {
    NAVIGATE,
    SET_VERIFICATION_TYPE_STATUS,
} from '../../../constants/action-types';
import { addUserAttachmentAction, addUserInfoAction, startUserVerificationAction, startUserVerificationEmailAction } from '.';
//FUNCTIONS

export function subscribeProcessVerificationStore() {
    const unsubscribe = processVerificationStore.subscribe(() => {
        console.log('RECEIVING PROCESS_VERIFICATION');
        var completeProcessVerification = true
        var fieldNames = []
        Object.entries(indexStore.getState().fieldsState).every(function (element, index) {
            fieldNames.push(element[1].name)
            if (!indexStore.getState().dataState[element[1].name].editable) {
                return true
            }
            if (element[1].required &&
                (
                    indexStore.getState().dataState[element[1].name] === undefined ||
                    (element[1].type !== 'upload_file' && indexStore.getState().dataState[element[1].name].value === '') ||
                    (element[1].type === 'upload_file' && JSON.stringify(indexStore.getState().dataState[element[1].name].value) === JSON.stringify({}))
                )
            ) {
                Alert.alert('Operation Error', 'Yo need to enter a valid ' + element[1].EN + ' to complete operation.', [
                    { text: 'Ok' }
                ]);
                completeProcessVerification = false
                return false
            }
            return true
        })
        if (!completeProcessVerification) {
            return
        }
        var delay = 0
        Object.entries(indexStore.getState().fieldsState).forEach(([key, value]) => {
            if (!indexStore.getState().dataState[value.name].editable) {
                return true
            }
            let processId = uuid.v4()
            processVerificationStore.getState().processIdsState.push(processId)
            if (value.type === 'upload_file') {
                console.log('----------------------------------Attachment')
                console.log(authPersistedStore.getState().userNameState)
                console.log(value.name)
                console.log(indexStore.getState().dataState[value.name].value.uri)
                console.log('----------------------------------')
                setTimeout(() => {
                    addUserAttachmentStore.dispatch(
                        addUserAttachmentAction(
                            authPersistedStore.getState().userNameState,
                            value.name,
                            value.name,
                            indexStore.getState().dataState[value.name].value.uri,
                            'image/jpeg',
                            null,
                            processId,
                            null
                        )
                    )
                }, delay)
            } else {
                console.log('----------------------------------Info')
                console.log(authPersistedStore.getState().userNameState)
                console.log(value.name)
                console.log(indexStore.getState().dataState[value.name].value)
                console.log('----------------------------------')
                setTimeout(() => {
                    addUserInfoStore.dispatch(
                        addUserInfoAction(
                            authPersistedStore.getState().userNameState,
                            value.name,
                            indexStore.getState().dataState[value.name].value,
                            null,
                            null,
                            processId
                        )
                    )
                }, delay)
            }
            delay = delay + 300
        })
        let interval = setInterval(() => {
            if (completeProcessVerification && processVerificationStore.getState().processIdsState.length === 0) {
                if (indexStore.getState().typeState !== 'A') {
                    startUserVerificationStore.dispatch(
                        startUserVerificationAction(
                            authPersistedStore.getState().userNameState,
                            '',
                            fieldNames,
                            indexStore.getState().typeState
                        )
                    )
                } else {
                    startUserVerificationEmailStore.dispatch(
                        startUserVerificationEmailAction(
                            authPersistedStore.getState().userNameState,
                            '',
                        )
                    )
                }
                clearInterval(interval)
                setTimeout(() => {
                    switch (indexStore.getState().typeState) {
                        case 'A':
                        case 'C':
                        case 'D':
                            indexStore.dispatch({ type: SET_VERIFICATION_TYPE_STATUS, payload: 'PROCESSING' })
                            break
                        case 'E':
                            navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'redirect__1' } })
                            break
                    }
                }, 500)
            }
        }, 3000)

    })
    return unsubscribe;
}
