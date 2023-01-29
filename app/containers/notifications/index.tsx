//PRINCIPAL
import React, { useEffect } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
//FUNCTIONS
import { decorateTimestamp } from '../../main/functions';
import { withUserName } from '../../main/hoc';
//HOOKS
import { getNotifications } from './hooks/getNotifications';
//COMPONENTS
//import Body from './components/Body';

const NotificationsScreen = ({ navigation, route, userName }) => {

  //HOOKS CALLS
  const { isLoading: isLoadingNotifications, data: dataNotifications, error: errorNotifications }
    = getNotifications(userName)

  const { colors } = useTheme<any>()

  //EFFECTS
  useEffect(() => {
    console.log('NotificationsScreen', route.params)
  }, []);

  //MEMOS
  const renderItem = (item) => {
    return (
      <View
        key={item.index}
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.primaryBackground,
          marginBottom: 10
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 20
          }}
        >
          {item.item.title}
        </Text>
        {/*item?.item?.contentParts?.map((i, k) => (
          <Text
            style={{
              color: colors.text,
              marginVertical: 5
            }}
            key={k}
          >
            {i}
          </Text>)
          )*/}
        <Text
          style={{
            color: colors.text,
            marginVertical: 5
          }}
        >
          {item?.item?.content}
        </Text>
        {item.item.timestamp !== undefined &&
          <View
            style={{
              justifyContent: 'flex-end',
              marginTop: 10,
              alignContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: colors.text,
                paddingLeft: 7,
              }}>
              {decorateTimestamp(item.item.timestamp)}
            </Text>
          </View>}
      </View>
    )
  }

  return (
    <View style={{
      width: Dimensions.get('window').width * 0.90,
      alignSelf: 'center',
      marginTop: 10,
      flex: 1
    }}>
      <FlatList
        data={dataNotifications}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.timestamp)}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        windowSize={50}
        initialNumToRender={20}
        //getItemLayout={getItemLayout}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

export default React.memo(withUserName(NotificationsScreen));
