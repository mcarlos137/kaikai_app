//PRINCIPAL
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, RefreshControl, ScrollView, Switch, Text, TouchableOpacity, View, } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from "react-native-share";
import { createThumbnail } from 'react-native-create-thumbnail';
import { compose } from 'redux'
//FUNCTIONS
import { decorateTimestamp } from '../../main/functions';
//HOOKS
import { getShorts } from '../../main/hooks/getShorts';
//CONSTANTS
import { REACTIONS } from '../../constants/social';
import { StackActions } from '@react-navigation/native';
//COMPONENTS
import BodyList from '../../main/components/BodyList';
//HOC
import { withColors, withUserName } from '../../main/hoc';

//CONSTANTS
const INSTRUCTIONS = [
  { text: 'Create a new short ("+" button on top) and upload your videos (30 secs or less).', iconName: '' },
  { text: 'Your videos will be reviewed and approved previously to be in the Shorts Feed', iconName: '' },
  { text: 'Accept donations from other users, provide the possibility to create paid calls with you and present your broadcastings and advidors.', iconName: '' },
]

const ShortsScreen = ({ navigation, route, colors, userName }) => {

  //INITIAL STATES
  const [videoThumbnails, setVideoThumbnails] = useState<any>({})

  //HOOKS CALLS
  const { isLoading: isLoadingShorts, isRefetching: isRefetchingShorts, data: dataShorts, error: errorShorts, refetch: refetchShorts } =
    getShorts([userName], null, null, null)

  //EFFECTS
  useEffect(() => {
    console.log('ShortsScreen', route.params)
  }, []);

  //CALLBACKS

  //FUNCTIONS
  const getReactionsQuantity = (reactions: any, types: string[]) => {
    var reactionsQuantity = 0
    Object.keys(reactions).forEach((key) => {
      if (reactions[key].length > 0 && types.includes(key)) {
        reactionsQuantity = reactionsQuantity + reactions[key].length
      }
    });
    return reactionsQuantity
  }

  const getThumbnail = (id, uri) => {
    createThumbnail({
      url: uri,
      timeStamp: 0,
    })
      .then(response => {
        setVideoThumbnails({
          ...videoThumbnails,
          [id]: { uri: response.path }
        })
      })
      .catch(err => {
        console.log('>>>>>>>>>>err ' + JSON.stringify(err))
      });
    return null
  }


  //COMPONENTS
  const renderItem = ({ item, index }) => (
    <View
      key={index}
      style={{
        flexDirection: index % 2 === 1 ? 'row-reverse' : 'row',
        marginTop: 10,
      }}
    >
      {getThumbnail(item.id, item.uri)}
      <View
        style={{
          alignSelf: 'center',
          padding: 10,
          borderRadius: 10,
          width: Dimensions.get('window').width * 0.75,
          flexDirection: index % 2 === 1 ? 'row' : 'row-reverse',
          //flexDirection: 'row',
          minHeight: 200,
          backgroundColor: colors.primaryBackground
        }}
      >
        <View
          style={{
            flex: 0.65,
            marginLeft: index % 2 === 1 ? 0 : 10,
            marginRight: index % 2 === 1 ? 10 : 0,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: colors.text
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 3,
              color: colors.text
            }}
          >
            {decorateTimestamp(item.timestamp)}
          </Text>
          <Text
            style={{
              fontSize: 10,
              marginTop: 3,
              color: colors.text
            }}
          >
            {item.description}
          </Text>
          <View
            style={{
              marginTop: 7,
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: colors.text
              }}
            >
              Tags:
            </Text>
            {item.tags.map((it, ind) => {
              return (
                <Text
                  key={ind}
                  style={{
                    fontSize: 12,
                    marginLeft: 3,
                    color: colors.text
                  }}
                >
                  {it}
                </Text>
              )
            })}
          </View>
          <View
            style={{
              marginTop: 3,
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: colors.text
              }}
            >
              Donations:
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 3,
                color: colors.text
              }}
            >
              {item.donationsAmountUSD} {'USD'}
            </Text>
          </View>
          <View
            style={{
              marginTop: 3,
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: colors.text
              }}
            >
              Views:
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 3,
                color: colors.text
              }}
            >
              {item.views.length}
            </Text>
          </View>
          <View
            style={{
              marginTop: 3,
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: colors.text
              }}
            >
              Shares:
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 3,
                color: colors.text
              }}
            >
              {item.shares.length}
            </Text>
          </View>
          <View
            style={{
              marginTop: 3,
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: colors.text
              }}
            >
              Comments:
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 3,
                color: colors.text
              }}
            >
              {item.commentsCount}
            </Text>
          </View>
          <View
            style={{
              marginTop: 3,
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: colors.text
              }}
            >
              Status:
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 3,
                color: colors.text
              }}
            >
              {item.status}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.35,
            backgroundColor: colors.getRandomMain(),
            alignItems: 'center',
            borderRadius: 10, padding: 5
          }}
        >
          <FastImage
            style={{
              padding: 10,
              height: 80,
              width: 80,
            }}
            source={
              videoThumbnails[item.id] !== undefined ?
                videoThumbnails[item.id] :
                require('../../../assets/blank.png')
            }
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5
            }}
          >
            <MaterialCommunityIcons
              name={'cards-heart'}
              color={'white'}
              size={20}
              style={{
                marginRight: 3
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: colors.text
              }}
            >
              {getReactionsQuantity(item.reactions, ['loves'])}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 5,
              marginBottom: 3,
              color: 'white'
            }}
          >
            comments
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {REACTIONS.map((it, ind) => {
              return (
                <View
                  key={ind}
                  style={{
                    flexDirection: 'row',
                    marginLeft: 3
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={
                      it === 'LIKES' ? require("../../../assets/like.gif") :
                        it === 'LOVES' ? require("../../../assets/love.gif") :
                          it === 'HAHAS' ? require("../../../assets/haha.gif") :
                            it === 'WOWS' ? require("../../../assets/wow.gif") :
                              it === 'SADS' ? require("../../../assets/sad.gif") :
                                it === 'ANGRIES' ? require("../../../assets/angry.gif") : ''
                    }
                  />
                  <Text
                    style={{
                      color: 'white'
                    }}
                  >
                    {getReactionsQuantity(item.reactions, [it])}
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          width: Dimensions.get('window').width * 0.15,
          marginRight: index % 2 === 1 ? 10 : 0,
          marginLeft: index % 2 === 1 ? 0 : 10,
          justifyContent: 'center',
          borderRadius: 10,
          padding: 5
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginBottom: 8
          }}
          onPress={() => {
            const options = {
              title: 'Share via',
              message: 'some message',
              url: 'some share url',
              //social: Share.Social.WHATSAPP,
              //whatsAppNumber: "9199999999",  // country code + phone number
              //filename: 'test' , // only for base64 file in Android
            };
            Share.open(options)
              .then((response) => {
                console.log({ response });
                console.log('>>>>>>>>>>>> share')
              })
              .catch((error) => {
                console.log({ error });
              });
          }}
        >
          <MaterialCommunityIcons
            name={'share-variant'}
            color={colors.icon}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginBottom: 8
          }}
          onPress={() => {
            navigation.dispatch(StackActions.push('ShortsVideoScreen', { ...route.params, selectedShorts: item }))
          }}
        >
          <MaterialCommunityIcons
            name={'video'}
            color={colors.icon}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.dispatch(StackActions.push('ShortsCommentsScreen', { ...route.params, selectedShort: item }))
          }}
        >
          <MaterialCommunityIcons
            name={'comment'}
            color={colors.icon}
            size={30}
          />
        </TouchableOpacity>
        {(item.status === 'PUBLISHED' || item.status === 'INACTIVE') &&
          <Switch
            trackColor={{ false: "red", true: "green" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => {
              /*
              changeStatusStore.dispatch(
                changeStatusAction(
                  item.id,
                  item.status === 'PUBLISHED' ? 'INACTIVE' : 'PUBLISHED',
                  'BROADCASTING'
                )
              )
              indexStore.dispatch({ type: SET_SELECTED_BROADCASTING_ID, payload: item.id })
              indexStore.dispatch({ type: UPDATE_BROADCASTING_DATA_VALUE, payload: { key: 'status', value: item.status === 'PUBLISHED' ? 'INACTIVE' : 'PUBLISHED' } })
                */
            }}
            style={{
              marginTop: 15,
              alignSelf: 'center'
            }}
            value={item.status === 'PUBLISHED'}
            disabled={false}
          />}
      </View>
    </View>
  )

  //PRINCIPAL RENDER
  return (
    <BodyList
      data={dataShorts}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      refreshing={isLoadingShorts || isRefetchingShorts}
      onRefresh={() => refetchShorts()}
      instructions={INSTRUCTIONS}
    />
  );
};

export default React.memo(compose(withColors, withUserName)(ShortsScreen));
