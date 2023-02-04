import React from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import { compose } from 'redux';
//HOC
import { withColors } from '../hoc';

const Component = ({
    onPress,
    label,
    colors
}) => {

    //PRINCIPAL RENDER
    return (
        <TouchableOpacity
            style={{
                backgroundColor: colors.getRandomMain(),
                marginTop: 20,
                borderRadius: 10
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    alignSelf: 'center',
                    color: 'white',
                    padding: 10
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
};

export default React.memo(compose(withColors)(Component));