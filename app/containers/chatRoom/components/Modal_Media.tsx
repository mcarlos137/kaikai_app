import React, { useEffect, useState, useRef } from 'react';
import {
  ImageBackground,
  StyleSheet,
  ToastAndroid,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import { compose } from 'redux';
//import VideoPlayer from 'react-native-video-controls';
import RNFetchBlob from 'rn-fetch-blob';
//import ImageViewer from 'react-native-image-zoom-viewer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PhotoEditor from '@baronha/react-native-photo-editor';
import { connect } from "react-redux";
//STORES
import { store as chatStore } from '../../../main/stores/chat';

const mapStateToProps = state => {
  return {
    mediaAsset: state.mediaAsset,
  };
};

const ConnectedComponent = ({
  mediaAsset,
}) => {

  const [path, setPath] = useState<any>(mediaAsset)
  //const isMounted = useRef(false)

  //EFFECTS
  useEffect(() => {
    //const interval = setInterval(() => {
    if (mediaAsset === null || mediaAsset.edited) {
      return
    }
    //isMounted.current = true
    const timeout = setTimeout(() => {
      openEditor()
    }, 500)
    //}, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [mediaAsset])


  const openEditor = () => {
    
  }

  return null
};

export default React.memo(compose(connect(mapStateToProps))(ConnectedComponent));

