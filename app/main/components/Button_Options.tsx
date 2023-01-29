import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { useNavigation, StackActions, useRoute } from '@react-navigation/native';

type Button_Options_Props = {
  options?: any[]
}

const Component = ({ options }: Button_Options_Props) => {

  //HOOKS CALLS
  const { colors } = useTheme<any>();
  const { dispatch } = useNavigation()
  const route = useRoute()

  //COMPONENTS
  const Option = ({ colors, iconName, onPress }) => (
    <TouchableOpacity
      style={{
        height: 40,
        backgroundColor: colors.background,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 5
      }}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={iconName}
        color={colors.icon}
        size={20}
      />
    </TouchableOpacity>
  )

  //PRINCIPAL RENDER
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        bottom: 100,
      }}
    >
      {options?.map((option, id) => <Option key={id} colors={colors} iconName={option.iconName} onPress={option.onPress} />)}
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: '#009387',
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          marginTop: 5
        }}
        onPress={() => {
          dispatch(StackActions.push('ChatScreen', { ...route.params }))
        }}
      >
        <MaterialCommunityIcons
          name={'message-text-outline'}
          color={'white'}
          size={20}
        />
      </TouchableOpacity>
    </View>
  )
};

export default Component;
