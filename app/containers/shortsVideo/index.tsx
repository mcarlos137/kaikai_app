//PRINCIPAL
import React, { useEffect, useState } from 'react';
import { View, } from 'react-native';
import Video from 'react-native-video';

const ShortsVideoScreen = ({ navigation, route }) => {

  const [uri, setUri] = useState(route.params.selectedShort.uri)

  useEffect(() => {
    console.log('ShortsVideoScreen', route.params)
  }, []);

  return (
    <View style={{
      flex: 1
    }}>
      <Video
        source={{
          uri: uri,
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
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
    </View >
  );
};

export default React.memo(ShortsVideoScreen);
