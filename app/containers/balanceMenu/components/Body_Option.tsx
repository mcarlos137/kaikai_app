import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';

const Component = ({ iconName, text, onPress }) => {

  //HOOKS CALLS
  const { colors } = useTheme<any>();

  //PRINCIPAL RENDER
  return (
    <View
      style={{
        flex: 1,
      }}>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={onPress}
        //disabled={iconName === 'point-of-sale' ? true : false}
        >
          {iconName === 'exchange'
            ?
            <FontAwesomeIcons
              name={iconName}
              color={colors.icon}
              size={90}
              style={{
                borderRadius: 20,
                borderWidth: 2,
                borderColor: 'grey',
              }}
            />
            :
            <MaterialCommunityIcons
              name={iconName}
              color={colors.icon}
              size={90}
              style={{
                borderRadius: 20,
                borderWidth: 2,
                borderColor: 'grey',
              }}
            />
          }
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          color: colors.text
        }}>
        {text}
      </Text>
    </View>
  )
};

export default React.memo(Component);