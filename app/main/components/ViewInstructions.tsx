//PRINCIPAL
import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

type ViewInstructions_Props = {
    instructions: any[]
    type: string
    marginTop: number
    linkText?: string
    linkTarget?: string
}

const Component = ({
    instructions,
    type,
    marginTop,
    linkText,
    linkTarget
}: ViewInstructions_Props) => {
    const { colors } = useTheme<any>();
    return (
        <ScrollView
            persistentScrollbar={true}
            style={{
                marginTop: marginTop,
                width: Dimensions.get('window').width * 0.95,
                alignSelf: 'center'
            }}
        >
            {instructions.map((value, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            flexDirection: index % 2 === 1 ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 5,
                            backgroundColor: index % 2 === 1 ? colors.secundaryBackground : colors.primaryBackground
                        }}
                    >
                        <IconMaterialCommunity
                            name={type === 'STEPS' ? 'numeric-' + (index + 1) + '-circle' : value.iconName}
                            color={colors.getRandomMain()}
                            size={50}
                            style={{
                                alignSelf: 'center',
                                flex: 0.15,
                            }}
                        />
                        <Text
                            style={{
                                marginLeft: 7,
                                alignContent: 'center',
                                flexWrap: 'wrap',
                                color: colors.text,
                                flex: 0.85
                            }}
                        >
                            {value.text}
                        </Text>
                    </View>
                )
            })}
            {linkTarget !== undefined && linkText !== undefined &&
                <TouchableOpacity
                    style={{
                    }}
                    onPress={() => {
                        //navigateStore.dispatch({ type: NAVIGATE, payload: { target: linkTarget } })
                    }}
                >
                    <Text
                        style={{
                            color: colors.getRandonMain(),
                            fontWeight: 'bold',
                            fontSize: 16,
                            textAlign: 'right',
                            marginRight: 10,
                            marginTop: 10
                        }}
                    >
                        {linkText}
                    </Text>
                </TouchableOpacity>
            }
        </ScrollView>
    )
};

export default Component;