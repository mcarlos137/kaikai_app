//PRINCIPAL
import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, processColor, FlatList, TouchableOpacity } from 'react-native';
import { TabView } from '@rneui/themed';
import { StackActions } from '@react-navigation/native'
import { compose } from 'redux'
//COMPONENTS
import Body_Chart from './components/Body_Chart'
//HOC
import { withColors } from '../../main/hoc';

const MoneyMarketScreen = ({ navigation, route, colors }) => {

  //VARIABLES
  const wsArray = [];

  //INITIAL STATES
  const [initiated, setInitiated] = useState(false)
  const [pairs, setPairs] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [previousDataChart, setPreviousDataChart] = useState({})
  const [finalDataChart, setFinalDataChart] = useState({})

  //EFFECTS
  useEffect(() => {
    console.log('MoneyMarketScreen', route.params)
    if (initiated) return
    setInitiated(true)
    //const pairs = ['BTCVES', 'USDVES', 'BTCARS', 'USDCOP', 'USDMXN']
    const pairs = ['BTCVES', 'USDVES', 'BTCARS', 'BTCCOP', 'EURUSD', 'USDMXN', 'USDCOP', 'USDARS']
    //let const = ['BTCVES', 'USDVES', 'EURUSD', 'USDMXN']
    setPairs(pairs)
    let timeDelay = 0
    Object.entries(pairs).forEach(([key, value]) => {
      setTimeout(() => {
        let ws = new WebSocket('wss://websocket.moneyclick.com/moneyMarket')
        ws.onopen = (e) => {
          console.log('Open!')
          ws.send(JSON.stringify({
            method: 'getCandles',
            params: {
              pair: value,
              period: '4H',
            }
          }))
        }
        ws.onmessage = ({ data }) => {
          let dataParsed = JSON.parse(data)
          let pair = dataParsed.params.pair;
          let candles = dataParsed.params.data;
          let finalData = {};
          finalData[pair] = [];
          Object.entries(candles).forEach(([key, value]) => {
            //console.log('addValue ' + JSON.stringify(value))
            finalData[pair].unshift(value);
          })
          setPreviousDataChart(finalData)
        }
        ws.onerror = (e) => {
          console.log('error ' + JSON.stringify(e))
        }
        ws.onclose = (e) => {
          console.log('close')
        }
        wsArray.push(ws)
      }, timeDelay)
      timeDelay = timeDelay + 3000
    })
  }, [])

  useEffect(() => {
    let dataChart = JSON.parse(JSON.stringify(finalDataChart));
    Object.entries(previousDataChart).forEach(([key, value]) => {
      if (dataChart[key] === undefined) {
        dataChart[key] = {
          dataSets: [{
            values: [],
            label: 'Prices',
            config: {
              highlightColor: processColor('darkgray'),
              shadowColor: processColor('black'),
              shadowWidth: 1,
              shadowColorSameAsCandle: true,
              increasingColor: processColor('#71BD6A'),
              increasingPaintStyle: 'FILL',
              decreasingColor: processColor('#D14B5A'),
              valueTextColor: processColor('black'),
            },
            xAxis: {},
            yAxis: {}
          }]
        }
      }
      Object.entries(value).forEach(([k, v]) => {
        if (dataChart[key].dataSets[0].values.length > 0) {
          if (dataChart[key].dataSets[0].values[dataChart[key].dataSets[0].values.length - 1].time === v.time) {
            dataChart[key].dataSets[0].values.pop()
          }
        }
        v.shadowH = Math.round(v.shadowH * 1e2) / 1e2
        v.shadowL = Math.round(v.shadowL * 1e2) / 1e2
        v.open = Math.round(v.open * 1e2) / 1e2
        v.close = Math.round(v.close * 1e2) / 1e2
        dataChart[key].dataSets[0].values.push(v)
      })
    })
    setFinalDataChart(dataChart)
  }, [previousDataChart])

  //COMPONENTS
  const renderItem = (item) => (
    <View
      key={item.index}
      style={{
        padding: 5,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontWeight: 'bold',
          fontSize: 20,
        }}
      >
        {item.item}
      </Text>
      <Body_Chart data={finalDataChart[item.item]} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 5,
            padding: 5,
            borderWidth: 1,
            borderColor: colors.border,
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.dispatch(StackActions.push('OrderBookScreen', { ...route.params, redirectToTarget: 'MoneyMarketScreen', selectedPair: item.item }))
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: 'bold',
              fontSize: 12,
            }}
          >
            Go to Order Book
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  //PRINCIPAL RENDER
  return (
    <View style={{
      //flex: 1,
      width: Dimensions.get('window').width * 0.95,
      alignSelf: 'center',
      height: '100%'
    }}>
      {/*<Provider store={tabStore}>
        <Body />
      </Provider>
      <Provider store={indexStore} >
        <Modal_Search />
  </Provider>*/}
      <TabView
        value={selectedTab}
        animationType="spring"
      >
        <TabView.Item style={{ width: Dimensions.get('window').width * 0.95, padding: 10, }}>
          <View style={{
            alignSelf: 'center',
          }}>
            <FlatList
              data={pairs}
              renderItem={renderItem}
              keyExtractor={item => String(item)}
              removeClippedSubviews={true}
              maxToRenderPerBatch={20}
              windowSize={50}
              initialNumToRender={20}
              //getItemLayout={getItemLayout}
              updateCellsBatchingPeriod={50}
            />
          </View >
        </TabView.Item>
        <TabView.Item style={{ width: Dimensions.get('window').width * 0.95, padding: 10 }}>
          {/*<Provider store={indexStore}>
            <Body_TopTraders />
</Provider>*/}
        </TabView.Item>
        <TabView.Item style={{ width: Dimensions.get('window').width * 0.95, padding: 10 }}>
          <View
            style={{
              height: 300
            }}
          >
            <Text>COMING UP NEXT</Text>
          </View>
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default React.memo(compose(withColors)(MoneyMarketScreen));

