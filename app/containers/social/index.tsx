//PRINCIPAL
import React from 'react';
import { Dimensions, StatusBar, View, } from 'react-native';
import { StackActions } from "@react-navigation/native";
//COMPONENTS
import BodyStack from '../../main/components/BodyStack'
import Button_Options from '../../main/components/Button_Options'

const SocialScreen = ({ navigation, route }) => {

  return (
    <BodyStack name={'Social'} navigation={navigation} route={route}>
      <Button_Options
        options={[
          {
            iconName: 'play-box-multiple',
            onPress: () => {
              //navigation.dispatch(StackActions.push('ChargesScreen', { ...route.params }))
            }
          },
          {
            iconName: 'medal',
            onPress: () => {
              //navigation.dispatch(StackActions.push('CustomerSupportScreen', { ...route.params }))
            }
          },
          {
            iconName: 'cellphone',
            onPress: () => {
              //navigation.dispatch(StackActions.push('FAQsScreen', { ...route.params }))
            }
          },
          {
            iconName: 'podcast',
            onPress: () => {
              //navigation.dispatch(StackActions.push('FAQsScreen', { ...route.params }))
            }
          },
        ]}
      />
    </BodyStack>
  );
};

export default React.memo(SocialScreen);
