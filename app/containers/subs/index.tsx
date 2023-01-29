//PRINCIPAL
import React from 'react';
import { Dimensions, StatusBar, View, } from 'react-native';
//COMPONENTS
import BodyStack from '../../main/components/BodyStack'

const SubsScreen = ({ navigation, route }) => {

  return (
    <BodyStack name={'Subs'} navigation={navigation} route={route}>

    </BodyStack>
  );
};

export default React.memo(SubsScreen);
