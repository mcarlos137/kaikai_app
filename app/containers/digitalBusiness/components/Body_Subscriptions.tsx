import React, { createRef, RefObject, useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View, ScrollView, processColor } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PieChart, BarChart, LineChart } from 'react-native-charts-wrapper';
//HOC
import { withColors } from '../../../main/hoc';
//CONSTANTS
import { months } from '../../../constants/time';
import { StackActions } from '@react-navigation/native';

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

    const DESCRIPTION = {
        text: '',
        textSize: 15,
        textColor: processColor('gray'),
    }

    //FUNCTIONS
    const getData = (data, type) => {
        switch (type) {
            case 1:
                let activeSubscriptionUsersQuantity = 0
                let activeSubscriptionPremiumUsersQuantity = 0
                let activeSubscriptionTvShowsQuantity = 0
                let activeSubscriptionPodcastsQuantity = 0
                data?.users?.own?.map((item, index) => {
                    if (item.active) {
                        activeSubscriptionUsersQuantity++
                    }
                })
                data?.premiumUsers?.own?.map((item, index) => {
                    if (item.active) {
                        activeSubscriptionPremiumUsersQuantity++
                    }
                })
                data?.tvShows?.own?.map((item, index) => {
                    if (item.active) {
                        activeSubscriptionTvShowsQuantity++
                    }
                })
                data?.liveStreamings?.own?.map((item, index) => {
                    if (item.active) {
                        activeSubscriptionPodcastsQuantity++
                    }
                })
                return {
                    data: {
                        dataSets: [{
                            values: [
                                { value: activeSubscriptionUsersQuantity, label: 'Users' },
                                { value: activeSubscriptionPremiumUsersQuantity, label: 'Fan Content' },
                                { value: activeSubscriptionTvShowsQuantity, label: 'TV shows' },
                                { value: activeSubscriptionPodcastsQuantity, label: 'Podcasts' },
                            ],
                            label: '',
                            config: {
                                colors: [
                                    processColor(colors.chart1),
                                    processColor(colors.chart2),
                                    processColor(colors.chart3),
                                    processColor(colors.chart4)
                                ],
                                valueTextSize: 13,
                                sliceSpace: 5,
                                selectionShift: 13,
                                valueFormatter: "#.#'%'",
                                valueLineColor: processColor('gray'),
                                valueLinePart1Length: 0.5,
                                valueTextColor: processColor(colors.text),
                            }
                        }],
                    },
                }
            case 2:
                let activeSubscriptionPayedQuantity = 0
                let activeSubscriptionFreeQuantity = 0
                data?.users?.own?.map((item, index) => {
                    if (item.active) {
                        if (Number(item.amount) > 0.00) {
                            activeSubscriptionPayedQuantity++
                        } else {
                            activeSubscriptionFreeQuantity++
                        }
                    }
                })
                data?.tvShows?.own?.map((item, index) => {
                    if (item.active) {
                        if (Number(item.amount) > 0.00) {
                            activeSubscriptionPayedQuantity++
                        } else {
                            activeSubscriptionFreeQuantity++
                        }
                    }
                })
                data?.liveStreamings?.own?.map((item, index) => {
                    if (item.active) {
                        if (Number(item.amount) > 0.00) {
                            activeSubscriptionPayedQuantity++
                        } else {
                            activeSubscriptionFreeQuantity++
                        }
                    }
                })
                return {
                    data: {
                        dataSets: [{
                            values: [
                                { value: activeSubscriptionFreeQuantity, label: 'Free' },
                                { value: activeSubscriptionPayedQuantity, label: 'Payed' },
                            ],
                            label: '',
                            config: {
                                colors: [
                                    processColor(colors.chart5),
                                    processColor(colors.chart6),
                                ],
                                valueTextSize: 13,
                                sliceSpace: 5,
                                selectionShift: 13,
                                valueFormatter: "#.#'%'",
                                valueLineColor: processColor('gray'),
                                valueLinePart1Length: 0.5,
                                valueTextColor: processColor(colors.text),
                            }
                        }],
                    }
                }
            case 3:
                let tvShowsData: any[] = []
                let liveStreamingsData: any[] = []
                let usersData: any[] = []
                let premiumUsersData: any[] = []
                let payedData: any[] = []
                let freeData: any[] = []
                let datesData: string[] = []
                let partialData: any = {}
                let currentDate = new Date()
                let i = 0
                console.log('data>>>>>>>>>>>>>>>>>>>', data)
                if (JSON.stringify(data) !== JSON.stringify({})) {
                    while (i < 9) {
                        let monthPeriod = months[currentDate.getMonth()] + '-' + currentDate.getFullYear().toString().substring(2)
                        partialData[monthPeriod] = [
                            data?.tvShows?.general?.previousActiveOwnPayedSubscriptions + data?.tvShows?.general?.previousActiveOwnFreeSubscriptions,
                            data?.liveStreamings?.general?.previousActiveOwnPayedSubscriptions + data?.liveStreamings?.general?.previousActiveOwnFreeSubscriptions,
                            data?.users?.general?.previousActiveOwnPayedSubscriptions + data?.users?.general?.previousActiveOwnFreeSubscriptions,
                            data?.premiumUsers?.general?.previousActiveOwnPayedSubscriptions + data?.premiumUsers?.general?.previousActiveOwnFreeSubscriptions,
                            data?.tvShows?.general?.previousActiveOwnPayedSubscriptions + data?.liveStreamings?.general?.previousActiveOwnPayedSubscriptions + data?.users?.general?.previousActiveOwnPayedSubscriptions,
                            data?.tvShows?.general?.previousActiveOwnFreeSubscriptions + data?.liveStreamings?.general?.previousActiveOwnFreeSubscriptions + data?.users?.general?.previousActiveOwnFreeSubscriptions,
                        ]
                        currentDate.setMonth(currentDate.getMonth() - 1);
                        i++
                    }
                    data?.tvShows?.own?.map((item, index) => {
                        if (item.active) {
                            let date = new Date(Date.parse(item.initialTimestamp))
                            let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
                            if (partialData[monthPeriod] === undefined) return
                            partialData[monthPeriod][0] = partialData[monthPeriod][0] + 1
                            let loopActive = true
                            Object.keys(partialData).forEach((key) => {
                                if (key !== monthPeriod && loopActive) {
                                    partialData[key][0] = partialData[key][0] + 1
                                } else {
                                    loopActive = false
                                }
                            });
                            if (Number(item.amount) > 0.00) {
                                partialData[monthPeriod][4] = partialData[monthPeriod][4] + 1
                                let loopActive = true
                                Object.keys(partialData).forEach((key) => {
                                    if (key !== monthPeriod && loopActive) {
                                        partialData[key][5] = partialData[key][5] + 1
                                    } else {
                                        loopActive = false
                                    }
                                });
                            } else {
                                partialData[monthPeriod][5] = partialData[monthPeriod][5] + 1
                                let loopActive = true
                                Object.keys(partialData).forEach((key) => {
                                    if (key !== monthPeriod && loopActive) {
                                        partialData[key][5] = partialData[key][5] + 1
                                    } else {
                                        loopActive = false
                                    }
                                });
                            }
                        }
                    })
                    data?.liveStreamings?.own?.map((item, index) => {
                        if (item.active) {
                            let date = new Date(Date.parse(item.initialTimestamp))
                            let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
                            if (partialData[monthPeriod] === undefined) return
                            partialData[monthPeriod][1] = partialData[monthPeriod][1] + 1
                            let loopActive = true
                            Object.keys(partialData).forEach((key) => {
                                if (key !== monthPeriod && loopActive) {
                                    partialData[key][1] = partialData[key][1] + 1
                                } else {
                                    loopActive = false
                                }
                            });
                            if (Number(item.amount) > 0.00) {
                                partialData[monthPeriod][4] = partialData[monthPeriod][4] + 1
                                let loopActive = true
                                Object.keys(partialData).forEach((key) => {
                                    if (key !== monthPeriod && loopActive) {
                                        partialData[key][4] = partialData[key][4] + 1
                                    } else {
                                        loopActive = false
                                    }
                                });
                            } else {
                                partialData[monthPeriod][5] = partialData[monthPeriod][5] + 1
                                let loopActive = true
                                Object.keys(partialData).forEach((key) => {
                                    if (key !== monthPeriod && loopActive) {
                                        partialData[key][5] = partialData[key][5] + 1
                                    } else {
                                        loopActive = false
                                    }
                                });
                            }
                        }
                    })
                    data?.users?.own?.map((item, index) => {
                        if (item.active) {
                            let date = new Date(Date.parse(item.initialTimestamp))
                            let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
                            if (partialData[monthPeriod] === undefined) return
                            partialData[monthPeriod][2] = partialData[monthPeriod][2] + 1
                            let loopActive = true
                            Object.keys(partialData).forEach((key) => {
                                if (key !== monthPeriod && loopActive) {
                                    partialData[key][2] = partialData[key][2] + 1
                                } else {
                                    loopActive = false
                                }
                            });
                            if (Number(item.amount) > 0.00) {
                                partialData[monthPeriod][4] = partialData[monthPeriod][4] + 1
                                let loopActive = true
                                Object.keys(partialData).forEach((key) => {
                                    if (key !== monthPeriod && loopActive) {
                                        partialData[key][4] = partialData[key][4] + 1
                                    } else {
                                        loopActive = false
                                    }
                                });
                            } else {
                                partialData[monthPeriod][5] = partialData[monthPeriod][5] + 1
                                let loopActive = true
                                Object.keys(partialData).forEach((key) => {
                                    if (key !== monthPeriod && loopActive) {
                                        partialData[key][5] = partialData[key][5] + 1
                                    } else {
                                        loopActive = false
                                    }
                                });
                            }
                        }
                    })
                    Object.keys(partialData).reverse().forEach((key) => {
                        if (partialData[key][0] !== 0 || partialData[key][1] !== 0 || partialData[key][2] !== 0 || partialData[key][3] !== 0 || partialData[key][4] !== 0 || partialData[key][5] !== 0) {
                            tvShowsData.push(partialData[key][0])
                            liveStreamingsData.push(partialData[key][1])
                            usersData.push(partialData[key][2])
                            premiumUsersData.push(partialData[key][3])
                            payedData.push(partialData[key][4])
                            freeData.push(partialData[key][5])
                            datesData.push(key)
                        }
                    });
                }
                console.log('tvShowsData', tvShowsData)
                console.log('liveStreamingsData', liveStreamingsData)
                console.log('usersData', usersData)
                console.log('premiumUsersData', premiumUsersData)
                console.log('payedData', payedData)
                console.log('freeData', freeData)
                console.log('datesData', datesData)
                return {
                    data: {
                        dataSets: [{
                            values: tvShowsData,
                            label: 'TV shows',
                            config: {
                                color: processColor(colors.chart1),
                                lineWidth: 3,
                                drawCircles: false,
                                valueTextColor: processColor(colors.text),
                            }
                        }, {
                            values: liveStreamingsData,
                            label: 'Podcasts',
                            config: {
                                color: processColor(colors.chart2),
                                lineWidth: 3,
                                drawCircles: false,
                                valueTextColor: processColor(colors.text),
                            }
                        }, {
                            values: usersData,
                            label: 'Users',
                            config: {
                                color: processColor(colors.chart3),
                                lineWidth: 3,
                                drawCircles: false,
                                valueTextColor: processColor(colors.text),
                            }
                        }, {
                            values: premiumUsersData,
                            label: 'Fan Content',
                            config: {
                                color: processColor(colors.chart4),
                                lineWidth: 3,
                                drawCircles: false,
                                valueTextColor: processColor(colors.text),
                            }
                        }, {
                            values: payedData,
                            label: 'Payed',
                            config: {
                                color: processColor(colors.chart5),
                                lineWidth: 3,
                                drawCircles: false,
                                valueTextColor: processColor(colors.text),
                            }
                        }, {
                            values: freeData,
                            label: 'Free',
                            config: {
                                color: processColor(colors.chart6),
                                lineWidth: 3,
                                drawCircles: false,
                                valueTextColor: processColor(colors.text),
                            }
                        }]
                    },
                    xAxis: datesData
                }
        }
    }

    //PRINCIPAL RENDER
    return (
        <View
            style={{
                paddingTop: 10,
            }}
        >
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
                    Subscriptions
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
                            scrollViewRef.current?.scrollTo({ x: scrollViewContentOffsetX - Dimensions.get('window').width * 0.95, animated: true });
                        }}
                    >
                        <MaterialCommunityIcons
                            name="arrow-left-drop-circle"
                            color={scrollViewContentOffsetX < 100 ? colors.iconDisabled : colors.icon}
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={scrollViewContentOffsetX > Dimensions.get('window').width * 0.95 - 200 ? true : false}
                        onPress={() => {
                            scrollViewRef.current?.scrollTo({ x: scrollViewContentOffsetX + Dimensions.get('window').width * 0.95, animated: true });
                        }}
                    >
                        <MaterialCommunityIcons
                            name="arrow-right-drop-circle"
                            color={scrollViewContentOffsetX > Dimensions.get('window').width * 0.95 - 200 ? colors.iconDisabled : colors.icon}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                style={{

                }}
                ref={scrollViewRef}
                onScroll={(e) => {
                    setScrollViewContentOffsetX(e.nativeEvent.contentOffset.x)
                }}
                horizontal={true}
                removeClippedSubviews={true}
                pagingEnabled={true}
                persistentScrollbar={true}
            >
                <View
                    style={{
                        width: Dimensions.get('window').width * 0.95,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <PieChart
                            style={{
                                flex: 1,
                                height: 190
                            }}
                            logEnabled={false}
                            animation={{ durationX: 2000 }}
                            chartBackgroundColor={processColor(colors.background)}
                            chartDescription={DESCRIPTION}
                            data={getData(data, 1)?.data}
                            legend={{ enabled: false }}
                            highlights={[{ x: 2 }]}
                            extraOffsets={{ left: 0, top: 0, right: 0, bottom: 0 }}
                            entryLabelColor={processColor(colors.text)}
                            entryLabelTextSize={11}
                            entryLabelFontFamily={'HelveticaNeue-Medium'}
                            drawEntryLabels={true}
                            rotationEnabled={true}
                            rotationAngle={45}
                            usePercentValues={true}
                            centerTextRadiusPercent={100}
                            holeRadius={40}
                            holeColor={processColor(colors.background)}
                            transparentCircleRadius={45}
                            transparentCircleColor={processColor(colors.primaryBackground)}
                            maxAngle={360}
                            onSelect={(e) => {
                                //navigation.dispatch(StackActions.push('DigitalBusinessDetailsScreen', { ...route.params }))
                            }}
                        //onChange={(event) => console.log(event.nativeEvent)}
                        />
                        <PieChart
                            style={{
                                flex: 1,
                                height: 190
                            }}
                            logEnabled={false}
                            animation={{ durationX: 2000 }}
                            chartBackgroundColor={processColor(colors.background)}
                            chartDescription={DESCRIPTION}
                            data={getData(data, 2)?.data}
                            legend={{ enabled: false }}
                            highlights={[{ x: 2 }]}
                            extraOffsets={{ left: 0, top: 0, right: 0, bottom: 0 }}
                            entryLabelColor={processColor(colors.text)}
                            entryLabelTextSize={11}
                            entryLabelFontFamily={'HelveticaNeue-Medium'}
                            drawEntryLabels={true}
                            rotationEnabled={true}
                            rotationAngle={45}
                            usePercentValues={true}
                            centerTextRadiusPercent={100}
                            holeRadius={40}
                            holeColor={processColor(colors.background)}
                            transparentCircleRadius={45}
                            transparentCircleColor={processColor(colors.primaryBackground)}
                            maxAngle={360}
                            onSelect={(e) => {
                                //navigation.dispatch(StackActions.push('DigitalBusinessDetailsScreen', { ...route.params }))
                            }}
                        //onChange={(event) => console.log(event.nativeEvent)}
                        />
                    </View>
                </View>
                <View
                    style={{
                        width: Dimensions.get('window').width * 0.95,
                        paddingTop: 10
                    }}
                >
                    <LineChart
                        style={{
                            flex: 1,
                            height: 170
                        }}
                        data={getData(data, 3)?.data}
                        animation={{ durationX: 2000 }}
                        chartDescription={DESCRIPTION}
                        legend={{ ...LEGEND, textColor: processColor(colors.text) }}
                        gridBackgroundColor={processColor(colors.text)}
                        chartBackgroundColor={processColor(colors.background)}
                        xAxis={{
                            valueFormatter: getData(data, 3)?.xAxis,
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
                        drawGridBackground={false}
                        borderColor={processColor('teal')}
                        borderWidth={1}
                        drawBorders={true}
                        autoScaleMinMaxEnabled={false}
                        touchEnabled={true}
                        dragEnabled={true}
                        scaleEnabled={true}
                        scaleXEnabled={true}
                        scaleYEnabled={true}
                        pinchZoom={true}
                        doubleTapToZoomEnabled={true}
                        highlightPerTapEnabled={true}
                        highlightPerDragEnabled={false}
                        // visibleRange={this.state.visibleRange}
                        dragDecelerationEnabled={true}
                        dragDecelerationFrictionCoef={0.99}
                        keepPositionOnRotation={false}
                    //onSelect={this.handleSelect.bind(this)}
                    />
                </View>
            </ScrollView>
            <View
                style={{
                    alignItems: 'flex-end',
                    paddingRight: 5
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
    )
}

export default React.memo(withColors(Component))
