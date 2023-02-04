import React from 'react';
import {
    Picker,
} from '@react-native-picker/picker'
import { compose } from 'redux';
//HOC
import { withColors } from '../hoc';

type Body_Picker_Props = {
    selectedValue: any
    values: any[]
    onValueChange: any
    marginTop: number
    labelField?: string
    colors: any
}

const Component = ({
    selectedValue,
    values,
    onValueChange,
    marginTop,
    labelField,
    colors
}: Body_Picker_Props) => {

    //PRINCIPAL RENDER
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

export default React.memo(compose(withColors)(Component));