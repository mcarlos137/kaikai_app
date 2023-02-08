import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { compose } from 'redux'
import { StackActions } from '@react-navigation/native';
//COMPONENTS
import WalletScreen from '../../app/containers/wallet';
//HOC
import { withColors } from '../../app/main/hoc';

const WalletStack = createStackNavigator();

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
                            source={require("../../assets/logo3.png")}
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

export default React.memo(compose(withColors)(WalletStackScreen))