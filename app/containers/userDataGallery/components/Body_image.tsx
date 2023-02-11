import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { compose } from 'redux';
//STORES
import { store as mediaStore, persistor as mediaPersistor } from '../../../main/stores/media';
//COMPONENTS
import Body_ImageVideo from '../../../main/components/Body_ImageVideo';
//TOOLS
import httpRequest from '../../../tools/httpRequest';
//HOC
import { withHmacInterceptor } from '../../../main/hoc';

const Component = ({
    userName,
    fileName,
    type,
    width,
    onPress,
    hmacInterceptor
}) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
    >
        <Provider store={mediaStore} >
            <PersistGate loading={null} persistor={mediaPersistor}>
                <Body_ImageVideo
                    source={'moneyclick'}
                    uri={'https://service8081.moneyclick.com/attachment/getUserFile/' + userName + '/' + fileName}
                    headers={hmacInterceptor?.process(
                        httpRequest.create(
                            'https://service8081.moneyclick.com',
                            '/attachment/getUserFile/' + userName + '/' + fileName,
                            'GET',
                            null,
                            false
                        )).headers}
                    width={width}
                    aspectRatioType={'square'}
                    fileName={fileName}
                    inType={type}
                    outType={'image'}
                />
            </PersistGate>
        </Provider>
    </TouchableOpacity>
);


export default React.memo(compose(withHmacInterceptor)(Component));