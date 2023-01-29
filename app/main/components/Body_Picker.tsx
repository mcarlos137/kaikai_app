import React from 'react';
import {
    Picker,
} from '@react-native-picker/picker'
import { useTheme } from 'react-native-paper';

type Body_Picker_Props = {
    selectedValue: any
    values: any[]
    onValueChange: any
    marginTop: number
    labelField?: string
}

const Component = ({
    selectedValue,
    values,
    onValueChange,
    marginTop,
    labelField
}: Body_Picker_Props) => {
    const { colors }: any = useTheme();
    return (
        <>
            <Picker
                style={{
                    backgroundColor: colors.primaryBackground,
                    borderRadius: 10,
                    marginTop: marginTop
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
                {values ? values.map((item, key) => {
                    return (
                        <Picker.Item
                            key={key}
                            color={colors.text}
                            label={labelField !== undefined ? item[labelField] : item}
                            value={item}
                            style={{
                                color: colors.text,
                                backgroundColor: colors.primaryBackground
                            }}
                        />
                    );
                }) : []}
            </Picker>
        </>
    )
};

export default React.memo(Component);