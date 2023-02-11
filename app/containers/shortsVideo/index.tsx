//PRINCIPAL
import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//STORES
import { store as mediaStore, persistor as mediaPersistor } from '../../main/stores/media';
//COMPONENTS
import Body_ImageVideo from '../../main/components/Body_ImageVideo'

const ShortsVideoScreen = ({ navigation, route }) => {

  useEffect(() => {
    console.log('ShortsVideoScreen', route.params.selectedShort.assetId)
  }, []);

  return (
    <View style={{
      flex: 1
    }}>
      <Provider store={mediaStore} >
        <PersistGate loading={null} persistor={mediaPersistor}>
          <Body_ImageVideo
            fileName={route.params.selectedShort.assetId}
            width={Dimensions.get('window').width * 0.95}
            aspectRatioType={'original'}
            inType={'video'}
            outType={'video'}
            videoProps={{
              paused: true,
              controls: true
            }}
          />
        </PersistGate>
      </Provider>

    </View >
  );
};

export default React.memo(ShortsVideoScreen);
