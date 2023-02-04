import React from 'react';
import {
    Dimensions,
    TextInput
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { compose } from 'redux';
//HOC
import { withColors } from '../hoc';

type Body_InputProps = {
    value: string | number
    onChangeText: any
    type: string
    placeholder: string
    options?: any
    colors: any
}

const Component = ({
    value,
    onChangeText,
    type,
    placeholder,
    options,
    colors
}: Body_InputProps) => {

    //PRINCIPAL RENDER
    return (
        <>
            {type !== 'text' ?
                <>
                    <TextInputMask
                        includeRawValueInChangeText={true}
                        onChangeText={onChangeText}
                        options={options}
                        value={String(Number(value).toFixed(options.precision))}
                        type={'money'}
                        placeholder={placeholder}
                        placeholderTextColor={colors.placeholderText}
                        style={{
                            fontSize: 14,
                            color: colors.text,
                            width: Dimensions.get('window').width * 0.90,
                            alignSelf: 'center',
                            backgroundColor: colors.primaryBackground,
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 10
                        }}
                    />
                </>
                :
                <TextInput
                    placeholder={placeholder}
                    value={String(value)}
                    maxLength={80}
                    onChangeText={onChangeText}
                    placeholderTextColor={colors.placeholderText}
                    style={{
                        fontSize: 14,
                        color: colors.text,
                        backgroundColor: colors.primaryBackground,
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10
                    }}
                />
            }
        </>
    )
};

export default React.memo(compose(withColors)(Component));