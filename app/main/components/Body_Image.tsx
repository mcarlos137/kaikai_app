import React from 'react'
import { Platform, } from 'react-native'
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'rn-fetch-blob';
import { createThumbnail } from 'react-native-create-thumbnail';
import { compose } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
//STORES
import { store as mediaStore } from '../stores/media';
//TOOLS
import httpRequest from '../../tools/httpRequest';
//HOC
import { withHmacInterceptor } from '../hoc';

const mapStateToProps = state => {
    return {
        assets: state.assets,
    };
};

const ConnectedComponent = ({
    assets,
    path,
    width,
    height,
    fileName,
    inType,
    outType,
    hmacInterceptor
}) => {

    if (assets[fileName] === undefined) {
        RNFetchBlob.config({
            fileCache: true,
            appendExt: inType === 'video' ? 'mp4' : 'jpeg',
        })
            .fetch(
                'GET',
                'https://service8081.moneyclick.com' + path,
                hmacInterceptor?.process(
                    httpRequest.create(
                        'https://service8081.moneyclick.com',
                        path,
                        'GET',
                        null,
                        false
                    )).headers)
            .then(data => {
                if (inType === 'video') {
                    const videoAsset = { uri: (Platform.OS === 'android') ? 'file://' + data.data : data.data }
                    mediaStore.dispatch({ type: 'SET_ASSET', payload: { id: fileName, videoAsset: videoAsset } })
                    createThumbnail({
                        url: videoAsset.uri,
                        timeStamp: 2000,
                    })
                        .then(data => {
                            mediaStore.dispatch({ type: 'SET_ASSET', payload: { id: fileName, imageAsset: { uri: (Platform.OS === 'android') ? 'file://' + data.path : data.path } } })
                        })
                        .catch(err => {
                            console.log('>>>>>>>>>>err2' + JSON.stringify(err))
                        });
                }
                if (inType === 'image') {
                    mediaStore.dispatch({ type: 'SET_ASSET', payload: { id: fileName, imageAsset: { uri: (Platform.OS === 'android') ? 'file://' + data.data : data.data } } })
                }
            })
            .catch(err => {
                console.log('>>>>>>>>>>err1 ' + JSON.stringify(err))
            });
    }

    //PRINCIPAL RENDER
    if (outType === 'image') {
        return (
            <FastImage
                style={{
                    width: width,
                    height: height,
                    margin: 5,
                    borderRadius: 16,
                    borderWidth: 0.75,
                    borderColor: 'white',
                }}
                source={{ uri: assets[fileName]?.imageAsset?.uri }}
            >
                {inType === 'video' &&
                    <Ionicons
                        name={'ios-play-circle-outline'}
                        color={'white'}
                        size={35}
                    />
                }
            </FastImage>
        )
    }

    return null

}

export default React.memo(compose(withHmacInterceptor, connect(mapStateToProps))(ConnectedComponent))