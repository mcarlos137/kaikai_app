import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//COMPONENTS
import SocialStackScreen from './components/SociaStackScreen';
import SubsStackScreen from './components/SubsStackScreen';
import OptionsStackScreen from './components/OptionsStackScreen';
import WalletStackScreen from './components/WalletStackScreen';
import UserDataStackScreen from './components/UserDataStackScreen';
//STORES
import { store as actionSheetOptionsStore } from '../app/main/stores/actionSheetOptions';


const tabBackgroundColors = {
  Social: '#d02860',
  Subs: '#1f65ff',
  Wallet: '#694fad',
  UserData: '#f5551b',
}

const MainTabScreen = ({ navigation, route }) => {

  const [selectedTab, setSelectedTab] = useState('Social')
  const Tab = createMaterialBottomTabNavigator();

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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Subs" component={SubsStackScreen}
        listeners={{
          tabPress: (e) => {
            setSelectedTab('Subs')
          }
        }}
        options={{
          tabBarLabel: 'Subs',
          tabBarIcon: ({ color }) => (
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dots-vertical" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Wallet" component={WalletStackScreen}
        listeners={{
          tabPress: (e) => {
            setSelectedTab('Wallet')
          }
        }}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="UserData" component={UserDataStackScreen}
        listeners={{
          tabPress: (e) => {
            setSelectedTab('UserData')
          }
        }}
        options={{
          tabBarLabel: 'User Info',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabScreen;
