import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { compose } from 'redux'
import { StackActions } from "@react-navigation/native";
//COMPONENTS
import SubsScreen from '../../app/containers/subs';
//HOC
import { withColors } from '../../app/main/hoc';

const SubsStack = createStackNavigator();

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
                source={require("../../assets/logo2.png")}
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
  
  export default React.memo(compose(withColors)(SubsStackScreen))