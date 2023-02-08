import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
//import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

const CameraBridgeScreen = ({ navigation, route }) => {

  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>('authorized');
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>('authorized');

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);

  useEffect(() => {
    console.log(`Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`);
    const showPermissionsPage = cameraPermission !== 'authorized' || microphonePermission === 'not-determined';
    showPermissionsPage ? navigation.navigate('PermissionsScreen') : navigation.navigate('CameraScreen')
  }, [cameraPermission, microphonePermission]);

  return <View style={{ flex: 1, backgroundColor: 'black' }} ></View>
}

export default React.memo(CameraBridgeScreen)
