import React, { useState, useEffect } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'rn-fetch-blob';
import { StackActions } from '@react-navigation/native';
import { createThumbnail } from 'react-native-create-thumbnail';
import { compose } from 'redux';
//TOOLS
import httpRequest from '../../../tools/httpRequest';
//HOC
import { withHmacInterceptor, withNavigation, withRoute, withUserName } from '../../../main/hoc';

const Component = ({
    width,
    height,
    item,
    navigation,
    route,
    userName,
    hmacInterceptor
}) => {

    //INITIAL STATES
    const [uri, setUri] = useState('')

    //EFFECTS
    useEffect(() => {
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
                console.log('data>>>>>>>>>>', data.data)
                if (uri === '') {
                    setUri((Platform.OS === 'android') ? 'file://' + data.data : data.data)
                }
            })
            .catch(err => {
                console.log('>>>>>>>>>>err ' + JSON.stringify(err))
            });
        if (item === 'video') {
            createThumbnail({
                url: 'https://service8081.moneyclick.com/attachment/getUserFile/' + userName + '/' + item.name,
                timeStamp: 0,
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
                    console.log('response>>>>>>>>>', data)
                    setUri((Platform.OS === 'android') ? 'file://' + data.path : data.path)
                })
                .catch(err => {
                    console.log('>>>>>>>>>>err ' + JSON.stringify(err))
                });
        }
    }, [])

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
                source={{ uri: uri }}
            />
        </TouchableOpacity>
    )
}

export default React.memo(compose(withNavigation, withRoute, withUserName, withHmacInterceptor)(Component))