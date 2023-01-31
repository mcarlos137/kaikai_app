//PRINCIPAL
import {
    Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
//STORES
import {
    indexStore,
    getUserVerificationFieldsStore,
    getUserVerificationMessagesStore,
    startUserVerificationStore,
    addUserAttachmentStore,
    addUserInfoStore,
    modifyUserInfoStore,
    getUserVerificationsStore,
    processVerificationStore,
    startUserVerificationEmailStore
} from '../store'
import {
    authPersistedStore,
    getConfigStore,
    navigateStore
} from '../../../main/store';
//ACTIONS
import {
    SET_VERIFICATION_FIELDS,
    SET_VERIFICATION_DATA_FIELD_VALUE,
    NAVIGATE,
    SET_VERIFICATION_TYPE_STATUS,
    SET_VERIFICATION_MESSAGES,
    GET_USER_VERIFICATION_FIELDS,
    GET_USER_VERIFICATION_MESSAGES,
    START_USER_VERIFICATION,
    START_USER_VERIFICATION_EMAIL,
    ADD_USER_ATTACHMENT,
    ADD_USER_INFO,
    MODIFY_USER_INFO,
    GET_USER_VERIFICATIONS
} from '../../../constants/action-types';
import { addUserAttachmentAction, addUserInfoAction, startUserVerificationAction, startUserVerificationEmailAction } from '.';
import { getConfigAction } from '../../../main/actions';
//FUNCTIONS
import { checkResponseErrors } from '../../../main/functions';


export function subscribeGetUserVerificationFieldsStore() {
    const unsubscribe = getUserVerificationFieldsStore.subscribe(() => {
        if (checkResponseErrors(getUserVerificationFieldsStore.getState().getUserVerificationFieldsStatusState, GET_USER_VERIFICATION_FIELDS)) return
        console.log('RECEIVING GET_USER_VERIFICATION_FIELDS');
        indexStore.dispatch(
            { type: SET_VERIFICATION_FIELDS, payload: getUserVerificationFieldsStore.getState().getUserVerificationFieldsDecoratedState }
        );
        Object.entries(getUserVerificationFieldsStore.getState().getUserVerificationFieldsDecoratedState).forEach(([key, value]) => {
            let val = ''
            let editable = true
            if (value.type === 'upload_file') {
                val = {}
            }
            if (authPersistedStore.getState().configState.others[value.name] !== undefined) {
                if (value.type === 'upload_file') {
                    val = { fileName: authPersistedStore.getState().configState.others[value.name] }
                } else {
                    val = authPersistedStore.getState().configState.others[value.name]
                }
                editable = false
            }
            if (authPersistedStore.getState().configState[value.name] !== undefined) {
                if (value.type === 'upload_file') {
                    val = { fileName: authPersistedStore.getState().configState[value.name] }
                } else {
                    val = authPersistedStore.getState().configState[value.name]
                }
                editable = false
            }
            if (val === '' && value.type === 'picker') {
                val = value.values.EN[0]
            }
            indexStore.dispatch(
                {
                    type: SET_VERIFICATION_DATA_FIELD_VALUE,
                    payload: { field: value.name, value: val, editable: editable }
                }
            )
        });
    })
    return unsubscribe;
}

export function subscribeGetUserVerificationMessagesStore() {
    const unsubscribe = getUserVerificationMessagesStore.subscribe(() => {
        if (checkResponseErrors(getUserVerificationMessagesStore.getState().getUserVerificationMessagesStatusState, GET_USER_VERIFICATION_MESSAGES)) return
        console.log('RECEIVING GET_USER_VERIFICATION_MESSAGES');
        indexStore.dispatch(
            { type: SET_VERIFICATION_MESSAGES, payload: getUserVerificationMessagesStore.getState().getUserVerificationMessagesState }
        );
    })
    return unsubscribe;
}

export function subscribeStartUserVerificationStore() {
    const unsubscribe = startUserVerificationStore.subscribe(() => {
        if (checkResponseErrors(startUserVerificationStore.getState().startUserVerificationStatusState, START_USER_VERIFICATION)) return
        console.log('RECEIVING START_USER_VERIFICATION');
        getConfigStore.dispatch(getConfigAction(authPersistedStore.getState().userNameState))
    })
    return unsubscribe;
}

export function subscribeStartUserVerificationEmailStore() {
    const unsubscribe = startUserVerificationEmailStore.subscribe(() => {
        if (checkResponseErrors(startUserVerificationEmailStore.getState().startUserVerificationEmailStatusState, START_USER_VERIFICATION_EMAIL)) return
        console.log('RECEIVING START_USER_VERIFICATION_EMAIL');
        getConfigStore.dispatch(getConfigAction(authPersistedStore.getState().userNameState))
    })
    return unsubscribe;
}


export function subscribeAddUserAttachmentStore() {
    const unsubscribe = addUserAttachmentStore.subscribe(() => {
        if (checkResponseErrors(addUserAttachmentStore.getState().addUserAttachmentStatusState, ADD_USER_ATTACHMENT)) return
        console.log('RECEIVING ADD_USER_ATTACHMENT');
        if (addUserAttachmentStore.getState().addUserAttachmentState.processId !== null) {
            var index = processVerificationStore.getState().processIdsState.indexOf(addUserAttachmentStore.getState().addUserAttachmentState.processId);
            if (index > -1) {
                processVerificationStore.getState().processIdsState.splice(index, 1);
            }
        }
        if (addUserAttachmentStore.getState().addUserAttachmentState.target !== null) {
            navigateStore.dispatch({ type: NAVIGATE, payload: { target: addUserAttachmentStore.getState().addUserAttachmentState.target } })
        }
    })
    return unsubscribe;
}

export function subscribeAddUserInfoStore() {
    const unsubscribe = addUserInfoStore.subscribe(() => {
        if (checkResponseErrors(addUserInfoStore.getState().addUserInfoStatusState, ADD_USER_INFO)) return
        console.log('RECEIVING ADD_USER_INFO');
        if (addUserInfoStore.getState().addUserInfoState.processId !== null) {
            var index = processVerificationStore.getState().processIdsState.indexOf(addUserInfoStore.getState().addUserInfoState.processId);
            if (index > -1) {
                processVerificationStore.getState().processIdsState.splice(index, 1);
            }
        }
    })
    return unsubscribe;
}

export function subscribeModifyUserInfoStore() {
    const unsubscribe = modifyUserInfoStore.subscribe(() => {
        if (checkResponseErrors(modifyUserInfoStore.getState().modifyUserInfoStatusState, MODIFY_USER_INFO)) return
        console.log('RECEIVING MODIFY_USER_INFO');
    })
    return unsubscribe;
}

export function subscribeGetUserVerificationsStore() {
    const unsubscribe = getUserVerificationsStore.subscribe(() => {
        if (checkResponseErrors(getUserVerificationsStore.getState().getUserVerificationsStatusState, GET_USER_VERIFICATIONS)) return
        console.log('RECEIVING GET_USER_VERIFICATIONS');
        if (getUserVerificationsStore.getState().getUserVerificationsState[indexStore.getState().typeState] === 'OK') {
            getConfigStore.dispatch(getConfigAction(authPersistedStore.getState().userNameState))
            indexStore.dispatch({ type: SET_VERIFICATION_TYPE_STATUS, payload: 'OK' })
            navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'redirect__1', redirectToTarget: 'BalanceDetailsScreen' } })
        } else if (getUserVerificationsStore.getState().getUserVerificationsState[indexStore.getState().typeState] === 'FAIL') {
            getConfigStore.dispatch(getConfigAction(authPersistedStore.getState().userNameState))
            indexStore.dispatch({ type: SET_VERIFICATION_TYPE_STATUS, payload: 'FAIL' })
        }
    })
    return unsubscribe;
}

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
