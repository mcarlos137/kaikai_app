import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { compose } from 'redux';
import { CommonActions, StackActions } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
//COMPONENTS
import SocialScreen from '../app/containers/social';
import SubsScreen from '../app/containers/subs';
import WalletScreen from '../app/containers/wallet';
import UserDataScreen from '../app/containers/userData';
//STORES
import { store as actionSheetOptionsStore } from '../app/main/stores/actionSheetOptions';
import { store as authStore } from '../app/main/stores/auth';
//HOC
import { withColors } from '../app/main/hoc';

const Tab = createMaterialBottomTabNavigator();

const SocialStack = createStackNavigator();
const SubsStack = createStackNavigator();
const OptionsStack = createStackNavigator();
const WalletStack = createStackNavigator();
const UserDataStack = createStackNavigator();

const tabBackgroundColors = {
  Social: '#d02860',
  Subs: '#1f65ff',
  Wallet: '#694fad',
  UserData: '#f5551b',
}

const MainTabScreen = ({ navigation, route }) => {

  const [selectedTab, setSelectedTab] = useState('Social')

  return (
    <Tab.Navigator
      initialRouteName={selectedTab}
      activeColor='grey'
      barStyle={{
        backgroundColor: tabBackgroundColors[selectedTab]
      }}
      shifting={true}
    >
      <Tab.Screen name="Social" component={SocialStackScreen}
        listeners={{
          tabPress: (e) => {
            setSelectedTab('Social')
          }
        }}
        options={{
          tabBarLabel: 'Social',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Subs" component={compose(withColors)(SubsStackScreen)}
        listeners={{
          tabPress: (e) => {
            setSelectedTab('Subs')
          }
        }}
        options={{
          tabBarLabel: 'Subs',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="animation-play" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Options" component={OptionsStackScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            switch (selectedTab) {
              case 'Social':
                actionSheetOptionsStore.getState().ref1.current?.setModalVisible(true)
                break
              case 'Subs':
                actionSheetOptionsStore.getState().ref2.current?.setModalVisible(true)
                break
              case 'Wallet':
                actionSheetOptionsStore.getState().ref3.current?.setModalVisible(true)
                break
              case 'UserData':
                actionSheetOptionsStore.getState().ref4.current?.setModalVisible(true)
                break
            }

          }
        }}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dots-vertical" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Wallet" component={compose(withColors)(WalletStackScreen)}
        listeners={{
          tabPress: (e) => {
            setSelectedTab('Wallet')
          }
        }}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="UserData" component={compose(withColors)(UserDataStackScreen)}
        listeners={{
          tabPress: (e) => {
            setSelectedTab('UserData')
          }
        }}
        options={{
          tabBarLabel: 'User Info',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const SocialStackScreen = ({ navigation, route }) => {
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
              source={require("../assets/logo1.png")}
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

const SubsStackScreen = ({ navigation, route, colors }) => {
  return (
    <SubsStack.Navigator screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <SubsStack.Screen name="SubsScreen" component={SubsScreen} options={{
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
              source={require("../assets/logo2.png")}
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
                width: 32,
                height: 32,
                backgroundColor: colors.secundaryBackground,
                borderRadius: 16,
                marginRight: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                navigation.dispatch(StackActions.push('NotificationsScreen', { ...route.params }))
              }}
            >
              <MaterialCommunityIcons
                name="bell"
                size={22}
                color={colors.icon}
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
                backgroundColor: colors.secundaryBackground,
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
                color={colors.icon}
              />
            </TouchableOpacity>
          </View>
        ),
      }} />
    </SubsStack.Navigator>
  )
};

const OptionsStackScreen = ({ navigation }) => (
  <OptionsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
  </OptionsStack.Navigator>
);

const WalletStackScreen = ({ navigation, route, colors }) => {

  return (
    <WalletStack.Navigator screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <WalletStack.Screen name="WalletScreen" component={WalletScreen} options={{
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
              source={require("../assets/logo3.png")}
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
                width: 32,
                height: 32,
                backgroundColor: colors.secundaryBackground,
                borderRadius: 16,
                marginRight: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                navigation.dispatch(StackActions.push('MoneyMarketScreen', { ...route.params }))
              }}
            >
              <MaterialCommunityIcons
                name="chart-waterfall"
                size={22}
                color={colors.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                backgroundColor: colors.secundaryBackground,
                borderRadius: 16,
                marginRight: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                navigation.dispatch(StackActions.push('BalanceMovementsScreen', { ...route.params }))
              }}
            >
              <MaterialCommunityIcons
                name="file-document"
                size={22}
                color={colors.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                backgroundColor: colors.secundaryBackground,
                borderRadius: 16,
                marginRight: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                navigation.dispatch(StackActions.push('NotificationsScreen', { ...route.params }))
              }}
            >
              <MaterialCommunityIcons
                name="bell"
                size={22}
                color={colors.icon}
              />
              {true &&
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 16,
                    width: 16,
                    borderRadius: 8,
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
                backgroundColor: colors.secundaryBackground,
                borderRadius: 16,
                marginRight: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                //walletStore.dispatch({ type: OPEN_SEARCH_MODAL, payload: true })
              }}
            >
              <MaterialCommunityIcons
                name="cloud-search"
                size={22}
                color={colors.icon}
              />
            </TouchableOpacity>
          </View>
        )
      }} />
    </WalletStack.Navigator>
  )
};

const UserDataStackScreen = ({ navigation, route, colors }) => {

  return (
    <UserDataStack.Navigator screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <UserDataStack.Screen name="UserDataScreen" component={UserDataScreen} options={{
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
              source={require("../assets/logo4.png")}
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
                width: 32,
                height: 32,
                backgroundColor: colors.secundaryBackground,
                borderRadius: 16,
                marginRight: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                navigation.dispatch(StackActions.push('SettingsScreen', { ...route.params }))
              }}
            >
              <MaterialCommunityIcons
                name="account-settings"
                size={22}
                color={colors.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                backgroundColor: colors.secundaryBackground,
                borderRadius: 16,
                marginRight: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                navigation.dispatch(StackActions.push('NotificationsScreen', { ...route.params }))
              }}
            >
              <MaterialCommunityIcons
                name="bell"
                size={22}
                color={colors.icon}
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
                backgroundColor: colors.secundaryBackground,
                borderRadius: 16,
                marginRight: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                //userDataStore.dispatch({ type: OPEN_SEARCH_MODAL, payload: true })
              }}
            >
              <MaterialCommunityIcons
                name="cloud-search"
                size={22}
                color={colors.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                backgroundColor: colors.secundaryBackground,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                Alert.alert('Log out', 'are you sure to log out?', [
                  {
                    text: 'Ok', onPress: () => {
                      console.log("log out")
                      authStore.dispatch(
                        {
                          type: 'SET_PARAMS',
                          payload:
                          {
                            userName: '',
                            secretKey: '',
                            time: null,
                            config: {},
                            frequentUsers: []
                          }
                        })
                      setTimeout(() => {
                        Keychain.resetGenericPassword().then(result => {
                          console.log('resetGenericPassword', result)
                        });
                      }, 500)
                      /*navigation.dispatch((state) => {
                        const routes = [{ name: 'SplashScreen' }];
                        return CommonActions.reset({
                          ...state,
                          routes,
                          index: routes.length - 1,
                        });
                      });*/
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'SignInScreen' }]
                        })
                      )
                    }
                  },
                  { text: 'Cancel' }
                ]);
              }}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color={colors.icon}
              />
            </TouchableOpacity>
          </View>
        ),
      }} />
    </UserDataStack.Navigator>
  )
};

export default MainTabScreen;
