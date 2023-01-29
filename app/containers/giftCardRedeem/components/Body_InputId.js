import React from 'react';
import {
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
//STORES
import { indexStore } from '../store';
//ACTIONS
import {
    SET_GIFT_CARD_REDEEM_ID,
} from '../../../constants/action-types';
//FUNCTIONS
import { openQRScan } from '../../../main/functions';

const Component = ({ id }) => {
    const { colors } = useTheme();
    return (
        <View style={{ flexDirection: 'row' }}>
            <TextInput
                placeholder={'Gift Card id'}
                value={id}
                maxLength={60}
                onChangeText={(text) => {
                    indexStore.dispatch(
                        {
                            type: SET_GIFT_CARD_REDEEM_ID,
                            payload: text
                        });
                }}
                placeholderTextColor={colors.placeholderText}
                style={{
                    fontSize: 14,
                    color: colors.text,
                    backgroundColor: colors.primaryBackground,
                    marginTop: 10,
                    flex: 0.9,
                    padding: 10,
                    borderRadius: 10
                }}
            />
            <TouchableOpacity
                style={{ paddingLeft: 15, paddingTop: 5, flex: 0.1 }}
                onPress={() => {
                    openQRScan('GIFT_CARD_REDEEEM')
                }}
            >
                <IconMaterialCommunity
                    name="qrcode"
                    color={colors.icon}
                    size={40}
                />
            </TouchableOpacity>
        </View>
    )
};

export default Component;