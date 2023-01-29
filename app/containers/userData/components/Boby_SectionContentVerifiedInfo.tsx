import React, { Fragment } from "react";
import { Text, View, TouchableOpacity, processColor, Dimensions, TextInput, Switch, Alert } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { compose } from 'redux';
//HOC
import { withColors, withConfig } from "../../../main/hoc";

const Component = ({
    data,
    isEditing,
    colors,
    config
}) => {

    return (
        <View
            style={{
                alignItems: 'center'
            }}
        >
            {data.map((item, key) => {
                return (
                    <Fragment
                        key={key}
                    >
                        {item.value !== undefined &&
                            <TouchableOpacity
                                style={{
                                    margin: 5,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    backgroundColor: colors.primaryBackground
                                }}
                                disabled={item.value.status === 'OK'}
                                onPress={() => {
                                    //navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'VerificationScreen', redirectToTarget: 'goBack__1', selectedVerificationType: item.name } });
                                }}
                            >
                                {item.value.status === 'OK' ?
                                    <View
                                        style={{
                                            flex: 0.9,
                                            alignSelf: 'center'
                                        }}
                                    >
                                        {console.log('item>>>>>', item)}
                                        {config?.verifications[item.name]?.fieldNames.map((it, k) => {
                                            return (
                                                <Text
                                                    key={k}
                                                    style={{
                                                        alignSelf: 'center',
                                                        textAlign: 'center',
                                                        color: colors.text,
                                                        //color: item.value.status === 'OK' ? 'green' : item.value.status === 'PROCESSING' ? 'orange' : item.value.status === 'FAIL' ? 'red' : 'grey',
                                                        padding: 5,
                                                    }}
                                                >
                                                    {it + ': '} {config[it] !== undefined ? config[it] : config?.others[it] !== undefined ? config.others[it] : ''}
                                                </Text>
                                            )
                                        })}
                                    </View> :
                                    <Text
                                        style={{
                                            alignSelf: 'center',
                                            textAlign: 'center',
                                            color: colors.text,
                                            //color: item.value.status === 'OK' ? 'green' : item.value.status === 'PROCESSING' ? 'orange' : item.value.status === 'FAIL' ? 'red' : 'grey',
                                            padding: 10,
                                            flex: 0.9
                                        }}
                                    >
                                        {item.text}
                                    </Text>
                                }
                                <MaterialIcons
                                    name={item.value.status === 'OK' ? 'check' : item.value.status === 'PROCESSING' ? 'cached' : item.value.status === 'FAIL' ? 'close' : 'add'}
                                    color={item.value.status === 'OK' ? 'green' : item.value.status === 'PROCESSING' ? 'orange' : item.value.status === 'FAIL' ? 'red' : 'grey'}
                                    size={25}
                                    style={{
                                        padding: 10,
                                        flex: 0.1
                                    }}
                                />
                            </TouchableOpacity>}
                    </Fragment>
                )
            })}
        </View>
    )
};

export default React.memo(compose(withColors, withConfig)(Component));
