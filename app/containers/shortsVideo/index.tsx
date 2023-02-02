//PRINCIPAL
import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import Video from 'react-native-video';

const ShortsVideoScreen = ({ navigation, route }) => {

  //const [uri, setUri] = useState(route.params.selectedShort.uri)

  useEffect(() => {
    console.log('ShortsVideoScreen', route.params.selectedShort.asset)
  }, []);

  return (
    <View style={{
      flex: 1
    }}>
      <Video
        source={{
          uri: route.params.selectedShort.asset.uri,
        }}
        rate={1.0}
        repeat={true}
        paused={false}
        controls={true}
        onError={(error) => {
          console.log('>>>>>>>>>>> ' + JSON.stringify(error))
        }}
        resizeMode={"cover"}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000
        }}
        style={{
          alignSelf: 'center',
          marginTop: 10,
          width: Dimensions.get('window').width * 0.95,
          height:  Dimensions.get('window').width * 0.95 * route.params.selectedShort.asset.height / route.params.selectedShort.asset.width
        }}
      />
    </View >
  );
};

export default React.memo(ShortsVideoScreen);
