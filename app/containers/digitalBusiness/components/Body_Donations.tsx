import React, { createRef, RefObject, useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View, ScrollView, processColor } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PieChart, BarChart, LineChart } from 'react-native-charts-wrapper';
import { StackActions } from '@react-navigation/native';
//HOC
import { withColors } from '../../../main/hoc';
//CONSTANTS
import { months } from '../../../constants/time';

const Component = ({ data, colors }) => {

    const LEGEND = {
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
        if (JSON.stringify(data) === JSON.stringify({})) {
            return {}
        }
        let values: any[] = []
        let datesData: string[] = []
        let countries: any[] = []
        let partialData = {}
        let currentDate = new Date()
        let i = 0
        while (i < 9) {
            let monthPeriod = months[currentDate.getMonth()] + '-' + currentDate.getFullYear().toString().substring(2)
            partialData[monthPeriod] = []
            let j = 0
            while (j < data.topCountries.length) {
                partialData[monthPeriod].push(0)
                j++
            }
            currentDate.setMonth(currentDate.getMonth() - 1);
            i++
        }
        console.log('partialData', partialData)
        let k = 0
        data.topCountries.map((item, index) => {
            countries.push(item.name)
            item.data.map((it, ind) => {
                let date = new Date(Date.parse(it.timestamp))
                let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
                if (partialData[monthPeriod] !== undefined) partialData[monthPeriod][k] = it.amount
            })
            k++
        })
        console.log('partialData1', partialData)
        let addDate = false
        Object.keys(partialData).reverse().forEach((key) => {
            let value: any[] = []
            partialData[key].map((item, index) => {
                if (Number(item) > 0) {
                    addDate = true
                }
                value.push(item)
            })
            if (addDate) {
                datesData.push(key)
                values.push({ y: value })
            }
        });
        if(values.length === 0) return {}
        return {
            data: {
                dataSets: [{
                    values: values,
                    label: '',
                    config: {
                        colors: [processColor(colors.chart1), processColor(colors.chart2), processColor(colors.chart3), processColor(colors.chart4)],
                        stackLabels: countries,
                        valueTextColor: processColor(colors.text),
                    }
                }],
            },
            xAxis: datesData
        }
    }

    //PRINCIPAL RENDER
    return (
        <>
            <View
                style={{
                    width: Dimensions.get('window').width * 0.95,
                    paddingTop: 10,
                    marginBottom: 40,
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}
                >
                    Donations (USD)
                </Text>
                <View
                    style={{
                        width: Dimensions.get('window').width * 0.95,
                        paddingTop: 10,
                    }}
                >
                    <BarChart
                        style={{
                            height: 160,
                        }}
                        data={getData(data, 1).data}
                        animation={{ durationX: 2000 }}
                        xAxis={{
                            valueFormatter: getData(data, 1).xAxis,
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
                        legend={{ ...LEGEND, textColor: processColor(colors.text) }}
                        chartDescription={{ text: "", textSize: 14, textColor: processColor('black') }}
                        gridBackgroundColor={processColor("#ffffff")}
                        visibleRange={{ x: { min: 1, max: 9 } }}
                        drawBarShadow={false}
                        drawValueAboveBar={true}
                        drawHighlightArrow={true}
                        onSelect={(e) => {
                            //navigation.dispatch(StackActions.push('DigitalBusinessDetailsScreen', { ...route.params }))
                        }}
                    //highlights={this.state.highlights}
                    //onChange={(event) => console.log(event.nativeEvent)}
                    />
                </View>
                <View
                    style={{
                        alignItems: 'flex-end',
                        paddingRight: 5,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            //navigation.dispatch(StackActions.push('DigitalBusinessDetailsScreen', { ...route.params }))
                        }}
                    >
                        <Text
                            style={{
                                color: 'blue',
                                fontSize: 14,
                                fontWeight: 'bold',
                                textDecorationLine: 'underline'
                            }}
                        >
                            details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default React.memo(withColors(Component))
