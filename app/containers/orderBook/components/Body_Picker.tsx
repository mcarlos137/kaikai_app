//PRINCIPAL
import React from 'react';
import {
    Picker,
} from '@react-native-picker/picker'
import { useTheme } from 'react-native-paper';

const Component = ({
    selectedValue,
    values,
    onValueChange
}) => {
    const { colors } = useTheme<any>();
    return (
        <Picker
            style={{
                backgroundColor: colors.primaryBackground,
                borderRadius: 10,
                flex: 0.35
            }}
            itemStyle={{
                height: 100,
                fontSize: 14,
            }}
            enabled={true}
            mode='dropdown'
            dropdownIconColor={colors.icon}
            selectedValue={selectedValue}
            onValueChange={onValueChange}
        >
            {values.map((item, key) => {
                return (
                    <Picker.Item
                        key={key}
                        color={colors.text}
                        label={item.label}
                        value={item.value}
                        style={{
                            color: colors.text,
                            backgroundColor: colors.primaryBackground
                        }}
                    />
                );
            })
            }
        </Picker>
    )
};

export default Component;