//PRINCIPAL
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import ActionSheet from "react-native-actions-sheet";
import { compose } from 'redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//HOC
import { withColors, withUserName } from '../hoc';

const Component = ({ customRef, navigation, route, colors, userName }) => {

    //INITIAL CONSTANTS
    const OPTIONS = [
        {
            icon: 'MaterialCommunityIcons__play-box-multiple__20__SELECTED_COLOR',
            title: 'Shorts',
            buttons: [
                {
                    type: 'ADD', icon: 'Ionicons__ios-add-circle__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('ShortsCreateScreen', { ...route.params }))
                        customRef.current?.setModalVisible(false)
                    }
                },
                {
                    type: 'LIST', icon: 'Ionicons__ios-list-sharp__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('ShortsScreen', { ...route.params }))
                        customRef.current?.setModalVisible(false);
                    }
                }
            ]
        },
        {
            icon: 'MaterialCommunityIcons__medal__20__SELECTED_COLOR',
            title: 'Premium Content',
            buttons: [
                {
                    type: 'ADD', icon: 'Ionicons__ios-add-circle__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('UserDataGalleryScreen', { ...route.params, selectedUserName: userName, selectedGalleryType: 'premiumGallery__ADD' }))
                        customRef.current?.setModalVisible(false);
                    }
                },
                {
                    type: 'LIST', icon: 'Ionicons__ios-list-sharp__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('UserDataGalleryScreen', { ...route.params, selectedUserName: userName, selectedGalleryType: 'premiumGallery' }))
                        customRef.current?.setModalVisible(false);
                    }
                }
            ]
        },
        {
            icon: 'Ionicons__ios-radio__20__SELECTED_COLOR',
            title: 'Live Streaming',
            buttons: [
                {
                    type: 'ADD', icon: 'Ionicons__ios-add-circle__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('LiveStreamingCreateScreen', { ...route.params }))
                        customRef.current?.setModalVisible(false);
                    }
                },
                {
                    type: 'LIST', icon: 'Ionicons__ios-list-sharp__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('LiveStreamingScreen', { ...route.params }))
                        customRef.current?.setModalVisible(false);
                    }
                }
            ]
        },
        {
            icon: 'MaterialCommunityIcons__cellphone__20__SELECTED_COLOR',
            title: 'Paid Calls',
            buttons: [
                {
                    type: 'ADD', icon: 'Ionicons__ios-add-circle__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('MoneyCallsCreateScreen', { ...route.params }))
                        customRef.current?.setModalVisible(false);
                    }
                },
                {
                    type: 'LIST', icon: 'Ionicons__ios-list-sharp__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('MoneyCallsScreen', { ...route.params }))
                        customRef.current?.setModalVisible(false);
                    }
                }
            ]
        },
        {
            icon: 'MaterialCommunityIcons__podcast__20__SELECTED_COLOR',
            title: 'Podcasts/TV shows',
            buttons: [
                /*{
                    type: 'ADD', icon: 'Ionicons__ios-add-circle__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('BroadcastingCreateScreen', { ...route.params }))
                        customRef.current?.setModalVisible(false);
                    }
                },*/
                {
                    type: 'LIST', icon: 'Ionicons__ios-list-sharp__30__THEME_COLOR',
                    onPress: () => {
                        navigation.dispatch(StackActions.push('BroadcastingScreen', { ...route.params }))
                        customRef.current?.setModalVisible(false);
                    }
                }
            ]
        }
    ]

    //COMPONENTS
    const getIcon = (icon) => {
        switch (icon.split('__')[0]) {
            case 'MaterialCommunityIcons':
                return (
                    <MaterialCommunityIcons
                        name={icon.split('__')[1]}
                        color={icon.split('__')[3] === 'SELECTED_COLOR' ? colors.getRandomMain() : colors.icon}
                        size={Number(icon.split('__')[2])}
                    />
                )
            case 'Ionicons':
                return (
                    <Ionicons
                        name={icon.split('__')[1]}
                        color={icon.split('__')[3] === 'SELECTED_COLOR' ? colors.getRandomMain() : colors.icon}
                        size={Number(icon.split('__')[2])}
                    />
                )
        }
    }

    //PRINCIPAL RENDER
    return (
        <ActionSheet
            ref={customRef}
            containerStyle={{
                backgroundColor: colors.primaryBackground,

                width: Dimensions.get('window').width
            }}
            onClose={() => {
                //console.log('>>>>>>>>>>>>>>>>close')
            }}
        >
            <View
                style={{
                    height: 300,
                    padding: 20,
                }}
            >
                {OPTIONS.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10
                            }}
                        >
                            <View
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: colors.secundaryBackground
                                }}
                            >
                                {getIcon(item.icon)}
                            </View>
                            <Text
                                style={{
                                    color: colors.text,
                                    fontWeight: 'bold',
                                    marginLeft: 7,
                                    fontSize: 16
                                }}
                            >
                                {item.title}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    position: 'absolute',
                                    right: 0
                                }}
                            >
                                {item.buttons.map((it, ind) => {
                                    return (
                                        <TouchableOpacity
                                            key={ind}
                                            onPress={it.onPress}
                                            style={{
                                                marginLeft: 15
                                            }}
                                        >
                                            {getIcon(it.icon)}
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    )
                })}
            </View>
        </ActionSheet>
    )
};

export default React.memo(compose(withColors, withUserName)(Component));
