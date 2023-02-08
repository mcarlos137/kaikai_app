import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { compose } from 'redux'
//COMPONENTS
import SocialScreen from '../../app/containers/social';
//HOC
import { withColors } from '../../app/main/hoc';

const SocialStack = createStackNavigator();

const SocialStackScreen = ({ navigation, route, colors }) => {

    return (
        <SocialStack.Navigator screenOptions={{
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <SocialStack.Screen name="SocialScreen" component={SocialScreen} options={{
                title: '',
                headerLeft: () => (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 10,
                            justifyContent: 'center'
                        }}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 30,
                            }}
                            source={require("../../assets/logo1.png")}
                        />
                    </View>
                ),
                headerRight: () => (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            alignSelf: 'flex-end',
                            marginRight: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: 32,
                                backgroundColor: route?.params?.selectedColor,
                                borderWidth: 1,
                                borderColor: route?.params?.selectedColor,
                                borderRadius: 5,
                                marginRight: 10,
                                paddingLeft: 5,
                                paddingRight: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                            onPress={() => {
                                /*socialStore.dispatch({ type: SET_SELECTED_TAB, payload: 4 })
                                setTimeout(() => {
                                  socialStore.dispatch({ type: SHOW_SOCIAL_LIVE_STREAMING_TAB, payload: true })
                                }, 500)
                                socialShortsPersistedStore.dispatch({ type: SET_SOCIAL_SHORTS_VISIBLE_INDEX, payload: -1 })
                                if (liveStreamingStore.getState().dataState.length === 0 || liveStreamingStore.getState().updateDataState) {
                                  liveStreamingStore.getState().updateDataState = false
                                  liveStreamingStore.dispatch({ type: CLEAR_LIVE_STREAMING_DATA })
                                  liveStreamingListStore.dispatch(
                                    liveStreamingListAction(
                                      [authPersistedStore.getState().userNameState],
                                      null,
                                      null,
                                      null,
                                      null,
                                      null,
                                      null,
                                      null,
                                    )
                                  )
                                }
                                liveStreamingOverviewIdStore.dispatch(
                                  liveStreamingOverviewIdAction(
                                    authPersistedStore.getState().userNameState
                                  )
                                )*/
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 11,
                                    marginRight: 3
                                }}
                            >
                                LIVE
                            </Text>
                            <MaterialCommunityIcons
                                name="radio-tower"
                                size={15}
                                color={'white'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 32,
                                height: 32,
                                backgroundColor: route?.params?.selectedColor,
                                borderRadius: 16,
                                marginRight: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                //navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'NotificationsScreen' } })
                            }}
                        >
                            <MaterialCommunityIcons
                                name="bell"
                                size={22}
                                color={'white'}
                            />
                            {true &&
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: 14,
                                        width: 14,
                                        borderRadius: 7,
                                        backgroundColor: 'red',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 9,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        4
                                    </Text>
                                </View>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 32,
                                height: 32,
                                backgroundColor: route?.params?.selectedColor,
                                borderRadius: 16,
                                marginRight: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                //socialStore.dispatch({ type: OPEN_SEARCH_MODAL, payload: true })
                            }}
                        >
                            <MaterialCommunityIcons
                                name="cloud-search"
                                size={22}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }} />
        </SocialStack.Navigator >
    )
};

export default React.memo(compose(withColors)(SocialStackScreen))