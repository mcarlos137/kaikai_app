//PRINCIPAL
import React, { useEffect } from 'react';
import { View, } from 'react-native';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
//STORES
import { store as chatStore, persistor as chatPersistor } from '../../main/stores/chat'
//COMPONENTS
import Body from './components/Body'

const ChatScreen = ({ navigation, route }) => {

  //EFFECTS
  useEffect(() => {
    console.log('ChatScreen', route.params)
    //getContacts();
  }, []);

  //PRINCIPAL RENDER
  return (
    <View style={{
      flex: 1
    }}>
      <Provider store={chatStore} >
        <PersistGate loading={null} persistor={chatPersistor}>
          <Body />
          {/*<Body />
          <Delete_Chat />
  <Modal />*/}
        </PersistGate>
      </Provider>
    </View>
  );
};

export default React.memo(ChatScreen);
