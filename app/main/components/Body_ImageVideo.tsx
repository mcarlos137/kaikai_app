import React from "react"
import FastImage from "react-native-fast-image"
import { connect } from "react-redux"
import { compose } from "redux"
import Video from "react-native-video"

const mapStateToProps = state => {
  return {
    assets: state.assets,
  };
};

const ConnectedComponent = ({ assets, assetId, type, style }) => {

  if (type === 'image' && assets[assetId]?.imageAsset?.uri !== undefined) {
    return (
      <FastImage
        style={style}
        source={{ uri: assets[assetId].imageAsset.uri }}
      />
    )
  }
  if (type === 'video' && assets[assetId]?.videoAsset?.uri !== undefined) {
    return (
      <Video
        source={{
          uri: assets[assetId].videoAsset.uri,
        }}
        paused={true}
        controls={true}
        resizeMode='cover'
        repeat={true}
        onError={(error) => {
          //console.log('>>>>>>>>>>>>> ' + JSON.stringify(error))
        }}
        style={style}
      />
    )
  }

  return null
}

export default React.memo(compose(connect(mapStateToProps))(ConnectedComponent))