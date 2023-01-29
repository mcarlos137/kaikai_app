import React, { createRef, RefObject, useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View, ScrollView, processColor } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PieChart, BarChart, LineChart } from 'react-native-charts-wrapper';
//HOC
import { withColors } from '../../../main/hoc';
//CONSTANTS
import { months } from '../../../constants/time';

const Component = ({ data, colors }) => {

    //INITIAL STATES
    const [scrollViewContentOffsetX, setScrollViewContentOffsetX] = useState(0)
    const [scrollViewRef, setScrollViewRef] = useState<RefObject<any>>(createRef())

    //CONSTANTS
    const CHARTS = [
        {
            title: 'Total',
            dataType: 'ALL'
        },
        {
            title: 'Subscriptions',
            dataType: 'SUBSCRIPTION'
        },
        {
            title: 'Paid Calls',
            dataType: 'MONEY_CALL'
        },
        {
            title: 'Donations',
            dataType: 'DONATION'
        },
    ]

    const LEGEND = {
        /*
        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        */
        enabled: true,
        textSize: 10,
        form: "CIRCLE",
        formSize: 6,
        xEntrySpace: 10,
        yEntrySpace: 3,
        formToTextSpace: 10,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
    }

    //FUNCTIONS
    const getData = (data, type) => {
        if (data.length === 0) {
            return {}
        }
        let earningsData: any = []
        let spendsData: any[] = []
        let datesData: string[] = []
        let usdEstimatedBalance = 0
        let partialData: any = {}
        let currentDate = new Date()
        let i = 0
        while (i < 9) {
            let monthPeriod = months[currentDate.getMonth()] + '-' + currentDate.getFullYear().toString().substring(2)
            partialData[monthPeriod] = [0, 0]
            currentDate.setMonth(currentDate.getMonth() - 1);
            i++
        }
        data.map((value, key) => {
            if (type !== 'ALL' && value.type !== type) return
            value.values.map((v, k) => {
                let date = new Date(Date.parse(v.timestamp))
                let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
                usdEstimatedBalance = usdEstimatedBalance + v.earnings - v.spends
                partialData[monthPeriod][0] = partialData[monthPeriod][0] + v.earnings
                partialData[monthPeriod][1] = partialData[monthPeriod][1] + v.spends
            })
        })
        Object.keys(partialData).reverse().forEach((key) => {
            if (partialData[key][0] !== 0 || partialData[key][1] !== 0) {
                earningsData.push(partialData[key][0])
                spendsData.push(partialData[key][1])
                datesData.push(key)
            }
        });
        return {
            type: 'DIGITAL_BUSINESS',
            name: 'Digital Business',
            data: {
                dataSets: [{
                    values: spendsData,
                    label: 'Spends',
                    config: {
                        drawValues: true,
                        colors: [processColor('red')],
                        valueTextColor: processColor(colors.text),
                    }
                }, {
                    values: earningsData,
                    label: 'Earnings USD ($)',
                    config: {
                        drawValues: true,
                        colors: [processColor('green')],
                        valueTextColor: processColor(colors.text),
                    }
                }],
                config: {
                    barWidth: 0.3,
                    group: {
                        fromX: -0.5,
                        groupSpace: 0.2,
                        barSpace: 0.1,
                    },
                }
            },
            dataShow: 'CHART',
            xAxis: datesData,
            usdEstimatedBalance: usdEstimatedBalance,
            img: 'MY_DIGITAL_BUSINESS',
            noDataText: 'Create a new MoneyCall, Podcast, TV show, Fan Content or Live Streaming',
            target: 'DigitalBusinessScreen'
        }
    }

    //PRINCIPAL RENDER
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    height: 30
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}
                >
                    Financial (USD)
                </Text>
                <View
                    style={{
                        position: 'absolute',
                        right: 5,
                        flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        disabled={scrollViewContentOffsetX < 100 ? true : false}
                        onPress={() => {
                            scrollViewRef?.current?.scrollTo({ x: scrollViewContentOffsetX - Dimensions.get('window').width * 0.95, animated: true });
                        }}
                    >
                        <MaterialCommunityIcons
                            name="arrow-left-drop-circle"
                            color={scrollViewContentOffsetX < 100 ? colors.iconDisabled : colors.icon}
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={scrollViewContentOffsetX > Dimensions.get('window').width * 0.95 * (CHARTS.length - 1) - 200 ? true : false}
                        onPress={() => {
                            scrollViewRef.current?.scrollTo({ x: scrollViewContentOffsetX + Dimensions.get('window').width * 0.95, animated: true });
                        }}
                    >
                        <MaterialCommunityIcons
                            name="arrow-right-drop-circle"
                            color={scrollViewContentOffsetX > Dimensions.get('window').width * 0.95 * (CHARTS.length - 1) - 200 ? colors.iconDisabled : colors.icon}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                ref={scrollViewRef}
                onScroll={(e) => {
                    setScrollViewContentOffsetX(e.nativeEvent.contentOffset.x)
                }}
                horizontal={true}
                removeClippedSubviews={true}
                pagingEnabled={true}
                persistentScrollbar={true}
            >
                {CHARTS.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                width: Dimensions.get('window').width * 0.95,
                                paddingBottom: 10
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.text,
                                    fontSize: 16,
                                    paddingBottom: 10,
                                }}
                            >
                                {item.title}
                            </Text>
                            <BarChart
                                style={{
                                    height: 160,
                                }}
                                data={getData(data, item.dataType).data}
                                xAxis={{
                                    valueFormatter: getData(data, item.dataType).xAxis,
                                    granularityEnabled: true,
                                    granularity: 1,
                                    textColor: processColor(colors.text),
                                }}
                                yAxis={{
                                    left: {
                                        textColor: processColor(colors.text)
                                    },
                                    right: {
                                        textColor: processColor(colors.text)
                                    }
                                }}
                                animation={{ durationX: 2000 }}
                                legend={{ ...LEGEND, textColor: processColor(colors.text) }}
                                chartDescription={{ text: "", textSize: 14, textColor: processColor('black') }}
                                gridBackgroundColor={processColor(colors.text)}
                                chartBackgroundColor={processColor(colors.background)}
                                visibleRange={{ x: { min: 1, max: 9 } }}
                                drawBarShadow={false}
                                drawValueAboveBar={true}
                                drawHighlightArrow={true}
                            //onSelect={this.handleSelect.bind(this)}
                            //highlights={this.state.highlights}
                            //onChange={(event) => console.log(event.nativeEvent)}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        </>
    )
}

export default React.memo(withColors(Component))
