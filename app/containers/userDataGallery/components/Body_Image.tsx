import React, { useState, useEffect } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'rn-fetch-blob';
import { StackActions } from '@react-navigation/native';
import { createThumbnail } from 'react-native-create-thumbnail';
import { compose } from 'redux';
//STORES
import { store as mediaStore } from '../../../main/stores/media';
//TOOLS
import httpRequest from '../../../tools/httpRequest';
//HOC
import { withHmacInterceptor, withNavigation, withRoute, withUserName } from '../../../main/hoc';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        assets: state.assets,
    };
};

const ConnectedComponent = ({
    assets,
    width,
    height,
    item,
    navigation,
    route,
    userName,
    hmacInterceptor
}) => {

    if (assets[item.name] === undefined) {
        RNFetchBlob.config({
            fileCache: true,
            appendExt: item.type === 'video' ? 'mp4' : 'jpeg',
        })
            .fetch(
                'GET',
                'https://service8081.moneyclick.com/attachment/getUserFile/' + userName + '/' + item.name,
                hmacInterceptor?.process(
                    httpRequest.create(
                        'https://service8081.moneyclick.com',
                        '/attachment/getUserFile/' + userName + '/' + item.name,
                        'GET',
                        null,
                        false
                    )).headers)
            .then(data => {
                if (item.type === 'video') {
                    mediaStore.dispatch({ type: 'SET_ASSET', payload: { id: item.name, videoAsset: { uri: (Platform.OS === 'android') ? 'file://' + data.data : data.data } } })
                }
                if (item.type === 'image') {
                    mediaStore.dispatch({ type: 'SET_ASSET', payload: { id: item.name, imageAsset: { uri: (Platform.OS === 'android') ? 'file://' + data.data : data.data } } })
                }
                /*if (uri === '') {
                    setUri((Platform.OS === 'android') ? 'file://' + data.data : data.data)
                }*/
            })
            .catch(err => {
                console.log('>>>>>>>>>>err ' + JSON.stringify(err))
            });
        if (item.type === 'video') {
            createThumbnail({
                url: 'https://service8081.moneyclick.com/attachment/getUserFile/' + userName + '/' + item.name,
                timeStamp: 2000,
                headers: hmacInterceptor?.process(
                    httpRequest.create(
                        'https://service8081.moneyclick.com',
                        '/attachment/getUserFile/' + userName + '/' + item.name,
                        'GET',
                        null,
                        false
                    )).headers,
            })
                .then(data => {
                    mediaStore.dispatch({ type: 'SET_ASSET', payload: { id: item.name, imageAsset: { uri: (Platform.OS === 'android') ? 'file://' + data.path : data.path } } })
                    //console.log('response>>>>>>>>>', data)
                    //setUri((Platform.OS === 'android') ? 'file://' + data.path : data.path)
                })
                .catch(err => {
                    console.log('>>>>>>>>>>err ' + JSON.stringify(err))
                });
        }
    }

    //PRINCIPAL RENDER
    return (
        <TouchableOpacity
            onPress={() => {
                setTimeout(() => {
                    console.log('WAIT')
                    navigation.dispatch(StackActions.push('UserDataGalleryViewScreen', { ...route.params, selectedGalleryItem: item }))
                }, 0)
            }}
            activeOpacity={0.9}
        >
            <FastImage
                style={{
                    width: width,
                    height: height,
                    margin: 5,
                    borderRadius: 16,
                    borderWidth: 0.75,
                    borderColor: 'white'
                }}
                source={{ uri: assets[item.name]?.imageAsset?.uri }}
            />
        </TouchableOpacity>
    )
}

export default React.memo(compose(withNavigation, withRoute, withUserName, withHmacInterceptor, connect(mapStateToProps))(ConnectedComponent))