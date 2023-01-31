import React, { useEffect } from "react";
import { compose } from "redux";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
//STORES
import { store as chatStore, persistor as chatPersistor } from '../../main/stores/chat'
//HOC
import { withColors, withHmacInterceptor } from "../../main/hoc";
//COMPONENTS
import Body from './components/Body'
import Body_Input from './components/Body_Input'
import Modal_Dots from './components/Modal_Dots'

const ChatRoomScreen = ({ navigation, route }) => {

    return (
        <Provider store={chatStore} >
            <PersistGate loading={null} persistor={chatPersistor}>
                <Body />
                <Body_Input />
                <Modal_Dots />
            </PersistGate>
        </Provider>
    )

}

export default React.memo(compose(withColors, withHmacInterceptor)(ChatRoomScreen))