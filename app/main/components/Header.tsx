//PRINCIPAL
import React from 'react';
import {
    Text,
    Image,
    View,
    Dimensions,
    Platform,
} from 'react-native';
import { Avatar } from '@rneui/themed';
import { NumericFormat } from 'react-number-format';
import { useTheme } from 'react-native-paper';
//FUNCTIONS
import { getRequire } from '../functions'

const Component = ({ currency, targetImg, maxAmount = 0.00, amount = 0.00 }) => {
    const { colors } = useTheme<any>()
    return (
        <View style={{
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center",
            backgroundColor: colors.getRandomMain(),
            width: Dimensions.get('window').width,
            zIndex: 15,
            elevation: (Platform.OS === 'android') ? 50 : 0
        }}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    alignContent: "center",
                    flexDirection: 'row'
                }}
            >
                <Avatar
                    size={35}
                    rounded
                    source={getRequire(currency?.img)}
                />
                <Image
                    source={require('../../../assets/icon_arrow.png')}
                    style={{ width: 30, height: 18, marginLeft: 15, marginRight: 15 }}
                />
                <Avatar
                    size={35}
                    rounded
                    source={getRequire(targetImg)}
                />
            </View>
            {(maxAmount !== undefined && amount !== undefined) &&
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: "bold",
                            fontSize: 21,
                        }}
                    >
                        {currency?.symbol}
                    </Text>
                    <NumericFormat
                        value={(maxAmount - amount) > 0 ? (maxAmount - amount) : 0}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={(currency?.value === 'BTC' || currency?.value === 'ETH') ? 8 : 2}
                        renderText={(value) => (
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 21,
                                    marginLeft: 5,
                                }}
                            >
                                {value}
                            </Text>
                        )}
                    />
                </View>}
        </View>
    )
};

export default React.memo(Component);