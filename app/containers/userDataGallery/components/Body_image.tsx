import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { compose } from 'redux';
//STORES
import { store as mediaStore, persistor as mediaPersistor } from '../../../main/stores/media';
//COMPONENTS
import Body_Image from '../../../main/components/Body_Image';

const Component = ({
    userName,
    fileName,
    type,
    width,
    height,
    onPress
}) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
    >
        <Provider store={mediaStore} >
            <PersistGate loading={null} persistor={mediaPersistor}>
                <Body_Image
                    path={'/attachment/getUserFile/' + userName + '/' + fileName}
                    width={width}
                    height={height}
                    fileName={fileName}
                    inType={type}
                    outType={'image'}
                />
            </PersistGate>
        </Provider>
    </TouchableOpacity>
);


export default React.memo(Component);