import React from 'react';
import {
    Text,
    View,
    ScrollView,
    ImageBackground,
    Button,
    Icon,
    TextInput,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    Picker,
} from '@react-native-picker/picker'
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import DatePicker from 'react-native-date-picker'
import { useTheme } from 'react-native-paper';
//STORES
import {
    addUserAttachmentStore,
    indexStore,
    processVerificationStore
} from '../store'
import { authPersistedStore, headersStore, navigateStore } from '../../../main/store';
//ACTIONS
import {
    NAVIGATE,
    PROCESS_VERIFICATION,
    SET_VERIFICATION_DATA_FIELD_VALUE,
    SET_VERIFICATION_PHOTO_FIELD_NAME,
    OPEN_DATE_MODAL
} from '../../../constants/action-types';
import { addUserAttachmentAction } from '../actions';
//COMPONENTS
import ActionSheetDocument from '../../../main/components/ActionSheetDocument'
//CONSTANTS
import { months } from '../../../constants/time'
//TOOLS
import httpRequest from '../../../tools/httpRequest';
//FUNCTIONS
import { getRequire, getAdminChatRoom } from '../../../main/functions';

const mapStateToProps = state => {
    return {
        typeState: state.typeState,
        typeStatusState: state.typeStatusState,
        fieldsState: state.fieldsState,
        messagesState: state.messagesState,
        dataState: state.dataState,
        actionSheetDocumentRefState: state.actionSheetDocumentRefState,
        openDateModalState: state.openDateModalState
    };
};

const ConnectedComponent = ({
    typeState,
    typeStatusState,
    fieldsState,
    messagesState,
    dataState,
    actionSheetDocumentRefState,
    openDateModalState
}) => {
    const { colors } = useTheme();
    return (
        <View
            style={{
                width: Dimensions.get('window').width * 0.9,
                alignSelf: 'center',
                marginTop: 20,
                flex: 1
            }}
        >
            <View
                style={{
                    marginTop: 10
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: colors.text,
                        fontSize: 18,
                        textAlign: 'justify',
                    }}
                >
                    {typeStatusState === 'NEW' || typeStatusState === 'DELETED'
                        ? 'Verify your account'
                        : typeStatusState === 'PROCESSING'
                            ? 'Verification IN PROCESS'
                            : typeStatusState === 'FAIL'
                                ? 'Verification FAILED' : null}
                </Text>
                <Text
                    style={{
                        marginTop: 5,
                        fontSize: 14,
                        color: colors.text,
                        textAlign: 'justify'
                    }}
                >
                    {messagesState[typeStatusState] !== undefined ? messagesState[typeStatusState].EN : ''}
                    {/*typeStatusState === 'NEW' || typeStatusState === 'DELETED'
                    ? 'Enter the information below to verify your identity. The data must correspond to the beneficiary and the attached documents must clearly show the basic data, otherwise the operation will be canceled. To solve any doubt or concern, contact us through the Customer Service section.'
                    : typeStatusState === 'PROCESSING'
                        ? 'You will receive a response for your verification within next 24 hours. Business operators can contact you for any situation or decline your request according to law issues.'
                        : typeStatusState === 'FAIL'
                            ? 'For more information contact your business operator over chat or by any of our contact phones.'
                            : null*/}
                </Text>
            </View>
            {typeStatusState === 'NEW' || typeStatusState === 'DELETED' &&
                <>
                    <ScrollView
                        persistentScrollbar={true}
                        style={{
                            marginTop: 10,
                        }}
                    >
                        {fieldsState.length > 0 &&
                            fieldsState.map((field) => {
                                return (
                                    <View
                                        style={{
                                            width: Dimensions.get('window').width * 0.8,
                                            alignSelf: 'center'
                                        }}
                                        key={field.name}
                                    >
                                        {field.type === 'text_input' && dataState[field.name] !== undefined
                                            ?
                                            <>
                                                <TextInput
                                                    style={{
                                                        borderBottomColor: 'grey',
                                                        borderBottomWidth: 1,
                                                        marginBottom: 10
                                                    }}
                                                    placeholder={field.EN}
                                                    onChangeText={(text) => {
                                                        indexStore.dispatch(
                                                            {
                                                                type: SET_VERIFICATION_DATA_FIELD_VALUE,
                                                                payload: { field: field.name, value: text, editable: true }
                                                            }
                                                        );
                                                    }}
                                                    value={dataState[field.name].value}
                                                    placeholderTextColor={'silver'}
                                                    editable={dataState[field.name] !== undefined || dataState[field.name].value !== '' ? dataState[field.name].editable : true}
                                                />
                                            </>
                                            :
                                            null
                                        }
                                        {field.type === 'picker' && dataState[field.name] !== undefined
                                            ?
                                            <Picker
                                                style={{
                                                    backgroundColor: colors.primaryBackground,
                                                    borderRadius: 10,
                                                }}
                                                itemStyle={{
                                                    height: 100,
                                                    fontSize: 14,
                                                }}
                                                enabled={true}
                                                mode='dropdown'
                                                dropdownIconColor={colors.icon}
                                                selectedValue={dataState[field.name].value}
                                                enabled={dataState[field.name] !== undefined ? dataState[field.name].editable : true}
                                                onValueChange={
                                                    (item) => {
                                                        indexStore.dispatch(
                                                            {
                                                                type: SET_VERIFICATION_DATA_FIELD_VALUE,
                                                                payload: { field: field.name, value: item, editable: true }
                                                            }
                                                        );
                                                    }
                                                }
                                            >
                                                {field.values.EN.map((item, key) => {
                                                    return (
                                                        <Picker.Item
                                                            key={key}
                                                            color={colors.text}
                                                            label={item}
                                                            value={item}
                                                            style={{
                                                                color: colors.text,
                                                                backgroundColor: colors.primaryBackground,
                                                            }}
                                                        />
                                                    );
                                                })
                                                }
                                            </Picker>
                                            :
                                            null
                                        }
                                        {field.type === 'date_picker' && dataState[field.name] !== undefined &&
                                            <>
                                                <TouchableOpacity
                                                    style={{
                                                        marginTop: 20,
                                                        borderColor: 'silver',
                                                        borderWidth: 2,
                                                        backgroundColor: 'white',
                                                    }}
                                                    disabled={dataState[field.name] !== undefined ? !dataState[field.name].editable : false}
                                                    onPress={() => {
                                                        indexStore.dispatch({ type: OPEN_DATE_MODAL, payload: true });
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            alignSelf: 'center',
                                                            color: colors.text,
                                                            padding: 10,
                                                        }}
                                                    >
                                                        {dataState[field.name].value !== '' ? ('' + months[new Date(dataState[field.name].value).getMonth()] + ' ' + new Date(dataState[field.name].value).getDate() + ', ' + new Date(dataState[field.name].value).getFullYear().toString()) : field.EN}
                                                    </Text>
                                                </TouchableOpacity>
                                                <DatePicker
                                                    modal
                                                    open={openDateModalState}
                                                    maximumDate={new Date()}
                                                    date={new Date()}
                                                    //minimumDate={new Date()}
                                                    is24hourSource="locale"
                                                    mode='date'
                                                    onConfirm={(date) => {
                                                        indexStore.dispatch({ type: OPEN_DATE_MODAL, payload: false })
                                                        indexStore.dispatch({ type: SET_VERIFICATION_DATA_FIELD_VALUE, payload: { field: field.name, value: date.toISOString(), editable: true } })
                                                    }}
                                                    onCancel={() => {
                                                        indexStore.dispatch({ type: OPEN_DATE_MODAL, payload: false })
                                                    }}
                                                />
                                            </>}
                                    </View>
                                );
                            })}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignContent: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            {fieldsState.length > 0
                                ?
                                fieldsState.map((field) => {
                                    if (field.type === 'upload_file' && dataState[field.name] !== undefined) {
                                        return (
                                            <View
                                                key={field.name}
                                                style={{
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                    marginTop: 20,
                                                }}
                                            >
                                                {JSON.stringify(dataState[field.name].value) === JSON.stringify({})
                                                    ?
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            indexStore.dispatch(
                                                                {
                                                                    type: SET_VERIFICATION_PHOTO_FIELD_NAME,
                                                                    payload: field.name
                                                                });
                                                            actionSheetDocumentRefState.current?.setModalVisible(true);
                                                        }}
                                                        style={{
                                                            alignSelf: 'center',
                                                        }}
                                                    >
                                                        <IconMaterialCommunity
                                                            name={field.name === 'fileSelfie' ? 'account-box' : field.name === 'fileIdentity' ? 'card-account-details-outline' : field.name === 'fileBank' ? 'bank' : field.name === 'fileAddress' ? 'home-map-marker' : 'file-download-outline'}
                                                            color={'grey'}
                                                            size={120}
                                                        />
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            indexStore.dispatch(
                                                                {
                                                                    type: SET_VERIFICATION_PHOTO_FIELD_NAME,
                                                                    payload: field.name
                                                                });
                                                            actionSheetDocumentRefState.current?.setModalVisible(true);
                                                        }}
                                                        disabled={dataState[field.name] !== undefined ? !dataState[field.name].editable : false}
                                                    >
                                                        <ImageBackground
                                                            source={dataState[field.name].value.uri === undefined
                                                                ?
                                                                {
                                                                    uri: 'https://service8081.moneyclick.com/attachment/getUserFile/' + authPersistedStore.getState().userNameState + '/' + dataState[field.name].value.fileName,
                                                                    method: 'GET',
                                                                    headers: headersStore.getState().hmacInterceptorState.process(
                                                                        httpRequest.create(
                                                                            'https://service8081.moneyclick.com',
                                                                            '/attachment/getUserFile/' + authPersistedStore.getState().userNameState + '/' + dataState[field.name].value.fileName,
                                                                            'GET',
                                                                            null,
                                                                            false
                                                                        )).headers,
                                                                } : { uri: dataState[field.name].value.uri }}
                                                            resizeMode='cover'
                                                            resizeMethod='scale'
                                                            style={{
                                                                height: 120,
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    textAlign: 'center',
                                                                    color: 'red',
                                                                    fontSize: 11
                                                                }}
                                                            >
                                                                {dataState[field.name].value.uri !== undefined ? 'Press to change' : ''}
                                                            </Text>
                                                        </ImageBackground>
                                                    </TouchableOpacity>
                                                }
                                                <Text
                                                    style={{
                                                        width: 160,
                                                        height: 40,
                                                        fontSize: 15,
                                                        color: 'grey',
                                                        textAlign: 'center',
                                                        textAlignVertical: 'center',
                                                    }}
                                                >
                                                    {field.EN}
                                                </Text>
                                            </View>
                                        )
                                    }
                                })
                                :
                                null
                            }
                        </View>
                    </ScrollView>
                    <ActionSheetDocument
                        actionSheetDocumentRef={actionSheetDocumentRefState}
                        operation={'VERIFICATION'}
                        cameraType={'CAMERA_PHOTO'}
                        libraryType={'LIBRARY_PHOTO'}
                        color={navigateStore.getState().selectedColorState}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: navigateStore.getState().selectedColorState,
                            marginBottom: 20
                        }}
                        onPress={() => {
                            //ADD INFOS AND ADD ATTACHMENTS
                            processVerificationStore.dispatch({ type: PROCESS_VERIFICATION, payload: true })
                            //navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'redirect__2', redirectToTarget: 'BalanceDetailsScreen' } });
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: 'center',
                                color: 'white',
                                padding: 10,
                            }}
                        >
                            {'SEND'}
                        </Text>
                    </TouchableOpacity>
                </>}
            {typeStatusState === 'FAIL' || typeStatusState === 'PROCESSING' &&
                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        backgroundColor: navigateStore.getState().selectedColorState,
                    }}
                    onPress={() => {
                        // CHANGE CHAT ROOM
                        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'ChatRoomScreen', redirectToTarget: 'VerificationScreen', selectedChatRoom: getAdminChatRoom(item.item.id), selectedPhone: {} } });
                    }}
                >
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: 'white',
                            padding: 10,
                        }}
                    >
                        {'CHAT'}
                    </Text>
                </TouchableOpacity>}
            {typeStatusState === 'FAIL' &&
                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        backgroundColor: navigateStore.getState().selectedColorState,
                    }}
                    onPress={() => {
                        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'CustomerSupportScreen' } });
                    }}
                >
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: 'white',
                            padding: 10,
                        }}
                    >
                        {'ADDITIONAL CONTACT INFO'}
                    </Text>
                </TouchableOpacity>}
        </View>
    )
};

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;