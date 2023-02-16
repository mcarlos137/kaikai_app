//PRINCIPAL
import React, { useState } from 'react';
import { Dimensions, StatusBar, View, } from 'react-native';
import { StackActions } from "@react-navigation/native";
import { TabView } from '@rneui/themed';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
//STORES
import { store as shortsStore, persistor as shortsPersistor } from '../../main/stores/shorts'; 
//COMPONENTS
import BodyStack from '../../main/components/BodyStack'
import Button_Options from '../../main/components/Button_Options'
import Body_Shorts from './components/Body_Shorts'

const SocialScreen = ({ navigation, route }) => {

  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <BodyStack name={'Social'} navigation={navigation} route={route}>
      <>
        <TabView
          value={selectedTab}
          animationType="spring"
          disableSwipe={true}
        >
          <TabView.Item style={{ width: Dimensions.get('window').width }}>
            <Provider store={shortsStore} >
              <PersistGate loading={null} persistor={shortsPersistor}>
                <Body_Shorts
                  selectedTab={selectedTab}
                />
              </PersistGate>
            </Provider>
          </TabView.Item>
        </TabView>
      </>
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
