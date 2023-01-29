import React from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import { useTheme } from 'react-native-paper';

const Component = ({
    onPress,
    label
}) => {
    const { colors } = useTheme<any>();
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

export default React.memo(Component);