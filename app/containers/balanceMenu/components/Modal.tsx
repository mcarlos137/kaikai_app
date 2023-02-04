import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Modal from 'react-native-modal';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

//COMPONENTS
const Button = ({ title, colors, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderColor: colors.border,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10
      }}
      onPress={onPress}
    >
      <Text
        style={{
          alignSelf: 'center',
          color: colors.text,
          padding: 10,
          fontWeight: 'bold'
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const Component = ({ isVisible, title, buttons, onPressClose }) => {

  //HOOKS CALLS
  const { colors } = useTheme<any>();

  //PRINCIPAL RENDER
  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0, alignItems: 'center', justifyContent: 'flex-end' }}
      backdropColor={'#000'}
      backdropOpacity={0.7}
      animationIn='slideInRight'
      animationOut='slideOutLeft'
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
    >
      <View
        style={{
          height: 220,
          width: Dimensions.get('window').width,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: colors.secundaryBackground,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 2 }} />
          <View style={{ flex: 8 }} >
            <Text
              style={{
                color: colors.text,
                fontSize: 22,
                padding: 10,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {title}
            </Text>
          </View>
          <View style={{ flex: 2 }} >
            <TouchableOpacity
              style={{ paddingTop: 12 }}
              onPress={onPressClose}
            >
              <FontAwesomeIcons
                name="close"
                color={colors.icon}
                size={26}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            marginTop: 10
          }}
        >
          {buttons.map(button => {
            return <Button key={button.id} title={button.title} colors={colors} onPress={button.onPress} />
          })}
        </View>
      </View>
    </Modal>
  )
};

export default React.memo(Component);
