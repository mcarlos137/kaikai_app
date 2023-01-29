//PRINCIPAL
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import { NumericFormat } from 'react-number-format';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//HOC
import { withColors } from '../hoc';

const Component = ({
    reference,
    onPressCamera,
    onPressLibrary,
    colors
}) => {

    //PRINCIPAL RENDER
    return (
        <ActionSheet
            ref={reference}
            containerStyle={{
                backgroundColor: colors.primaryBackground
            }}
        >
            <View
                style={{
                    alignSelf: 'center',
                    flexDirection: 'row',
                }}
            >
                <TouchableOpacity
                    onPress={onPressCamera}
                    /*onPress={() => {
                        switch (cameraType) {
                            case 'CAMERA_PHOTO':
                            case 'CAMERA_VIDEO':
                                handleChooseDocument(operation, cameraType);
                                break;
                            case 'CAMERA_PHOTO_VIDEO':
                                switch (operation) {
                                    case 'USER_DATA_GALLERY':
                                    case 'USER_DATA_GALLERY_PREMIUM':
                                        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'CameraScreen', redirectToTarget: 'UserDataGalleryScreen' } })
                                        break;
                                }
                                break;
                        }
                    }}*/
                    style={{
                        width: 100,
                        padding: 20,
                        borderRadius: 40,
                    }}

                >
                    <MaterialCommunityIcons
                        //name={cameraType === 'CAMERA_VIDEO' ? 'video-box' : 'camera'}
                        name={'camera'}
                        color={colors.getRandomMain()}
                        size={50}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPressLibrary}
                    //onPress={() => {
                        //handleChooseDocument(operation, libraryType);
                    //}}
                    style={{
                        width: 100,
                        padding: 20,
                        borderRadius: 40,
                    }}
                >
                    <MaterialCommunityIcons
                        name={'folder'}
                        color={colors.getRandomMain()}
                        size={50}
                    />
                </TouchableOpacity>
            </View>
        </ActionSheet>
    )
};

export default React.memo(withColors(Component));
