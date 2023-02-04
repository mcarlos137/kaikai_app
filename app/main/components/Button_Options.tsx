import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { compose } from 'redux';
import { StackActions } from '@react-navigation/native';
//HOC
import { withColors, withNavigation, withRoute } from '../hoc';

type Button_Options_Props = {
  options?: any[]
  navigation: any
  route: any
  colors: any
}

const Component = ({ options, navigation, route, colors }: Button_Options_Props) => {

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
          navigation.dispatch(StackActions.push('ChatScreen', { ...route.params }))
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

export default React.memo(compose(withNavigation, withRoute, withColors)(Component));
