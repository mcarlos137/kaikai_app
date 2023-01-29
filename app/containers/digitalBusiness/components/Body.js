import React from 'react';
import {
    View,
    Dimensions,
    Text,
    ScrollView,
    processColor,
    TouchableOpacity
} from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-charts-wrapper';
import { Avatar } from '@rneui/themed';
import StarRating from 'react-native-star-rating';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import { useTheme } from 'react-native-paper';
//STORES
import { indexStore } from '../store';
import { headersStore, navigateStore } from '../../../main/store';
//ACTIONS
import { NAVIGATE, SET_DIGITAL_BUSINESS_FINANCIAL_SCROLL_VIEW_CONTENT_OFFSET_X, SET_DIGITAL_BUSINESS_MONEY_CALL_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X, SET_DIGITAL_BUSINESS_SUBSCRIPTION_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X } from '../../../constants/action-types';
//FUNCTIONS
import { decorateDonationDetailsData, decorateFinancialOverviewData, decorateMoneyCallDetailsData, decorateSubscriptionDetailsData } from '../actions/functions'
//TOOLS
import httpRequest from '../../../tools/httpRequest';

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

const DESCRIPTION = {
    text: '',
    textSize: 15,
    textColor: processColor('gray'),
}

const FINANCIAL_CHARTS = [
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

const mapStateToProps = state => {
    return {
        financialOverviewDataState: state.financialOverviewDataState,
        subscriptionDetailsDataState: state.subscriptionDetailsDataState,
        moneyCallDetailsDataState: state.moneyCallDetailsDataState,
        donationDetailsDataState: state.donationDetailsDataState,
        financialScrollViewRefState: state.financialScrollViewRefState,
        subscriptionDetailsScrollViewRefState: state.subscriptionDetailsScrollViewRefState,
        moneyCallDetailsScrollViewRefState: state.moneyCallDetailsScrollViewRefState,
        financialScrollViewContentOffsetXState: state.financialScrollViewContentOffsetXState,
        subscriptionDetailsScrollViewContentOffsetXState: state.subscriptionDetailsScrollViewContentOffsetXState,
        moneyCallDetailsScrollViewContentOffsetXState: state.moneyCallDetailsScrollViewContentOffsetXState,
    };
};

const ConnectedComponent = ({
    financialOverviewDataState,
    subscriptionDetailsDataState,
    moneyCallDetailsDataState,
    donationDetailsDataState,
    financialScrollViewRefState,
    subscriptionDetailsScrollViewRefState,
    moneyCallDetailsScrollViewRefState,
    financialScrollViewContentOffsetXState,
    subscriptionDetailsScrollViewContentOffsetXState,
    moneyCallDetailsScrollViewContentOffsetXState,
}) => {
    const { colors } = useTheme();
    return (
        <ScrollView
            style={{
                width: Dimensions.get('window').width * 0.95,
                alignSelf: 'center',
                flex: 1,
                paddingTop: 20,
            }}
            persistentScrollbar={true}
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
                        disabled={financialScrollViewContentOffsetXState < 100 ? true : false}
                        onPress={() => {
                            financialScrollViewRefState.current?.scrollTo({ x: financialScrollViewContentOffsetXState - Dimensions.get('window').width * 0.95, animated: true });
                        }}
                    >
                        <IconMaterialCommunity
                            name="arrow-left-drop-circle"
                            color={financialScrollViewContentOffsetXState < 100 ? colors.icon : colors.icon}
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={financialScrollViewContentOffsetXState > Dimensions.get('window').width * 0.95 * (FINANCIAL_CHARTS.length - 1) - 200 ? true : false}
                        onPress={() => {
                            financialScrollViewRefState.current?.scrollTo({ x: financialScrollViewContentOffsetXState + Dimensions.get('window').width * 0.95, animated: true });
                        }}
                    >
                        <IconMaterialCommunity
                            name="arrow-right-drop-circle"
                            color={financialScrollViewContentOffsetXState > Dimensions.get('window').width * 0.95 * (FINANCIAL_CHARTS.length - 1) - 200 ? colors.icon : colors.icon}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                ref={financialScrollViewRefState}
                onScroll={(e) => {
                    indexStore.dispatch({ type: SET_DIGITAL_BUSINESS_FINANCIAL_SCROLL_VIEW_CONTENT_OFFSET_X, payload: e.nativeEvent.contentOffset.x })
                }}
                horizontal={true}
                removeClippedSubviews={true}
                pagingEnabled={true}
                persistentScrollbar={true}
            >
                {FINANCIAL_CHARTS.map((item, index) => {
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
                                data={decorateFinancialOverviewData(financialOverviewDataState, item.dataType, colors).data}
                                xAxis={{
                                    valueFormatter: decorateFinancialOverviewData(financialOverviewDataState, item.dataType, colors).xAxis,
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
                            disabled={subscriptionDetailsScrollViewContentOffsetXState < 100 ? true : false}
                            onPress={() => {
                                subscriptionDetailsScrollViewRefState.current?.scrollTo({ x: subscriptionDetailsScrollViewContentOffsetXState - Dimensions.get('window').width * 0.95, animated: true });
                            }}
                        >
                            <IconMaterialCommunity
                                name="arrow-left-drop-circle"
                                color={subscriptionDetailsScrollViewContentOffsetXState < 100 ? colors.icon : colors.icon}
                                size={30}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={subscriptionDetailsScrollViewContentOffsetXState > Dimensions.get('window').width * 0.95 - 200 ? true : false}
                            onPress={() => {
                                subscriptionDetailsScrollViewRefState.current?.scrollTo({ x: subscriptionDetailsScrollViewContentOffsetXState + Dimensions.get('window').width * 0.95, animated: true });
                            }}
                        >
                            <IconMaterialCommunity
                                name="arrow-right-drop-circle"
                                color={subscriptionDetailsScrollViewContentOffsetXState > Dimensions.get('window').width * 0.95 - 200 ? colors.icon : colors.icon}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    style={{

                    }}
                    ref={subscriptionDetailsScrollViewRefState}
                    onScroll={(e) => {
                        indexStore.dispatch({ type: SET_DIGITAL_BUSINESS_SUBSCRIPTION_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X, payload: e.nativeEvent.contentOffset.x })
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
                                data={decorateSubscriptionDetailsData(subscriptionDetailsDataState, 1, colors).data}
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
                                    navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'DigitalBusinessDetailsScreen' } });
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
                                data={decorateSubscriptionDetailsData(subscriptionDetailsDataState, 2, colors).data}
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
                                    navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'DigitalBusinessDetailsScreen' } });
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
                            data={decorateSubscriptionDetailsData(subscriptionDetailsDataState, 3, colors).data}
                            animation={{ durationX: 2000 }}
                            chartDescription={DESCRIPTION}
                            legend={{ ...LEGEND, textColor: processColor(colors.text) }}
                            gridBackgroundColor={processColor(colors.text)}
                            chartBackgroundColor={processColor(colors.background)}
                            xAxis={{
                                valueFormatter: decorateSubscriptionDetailsData(subscriptionDetailsDataState, 3, colors).xAxis,
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
                            navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'DigitalBusinessDetailsScreen' } });
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
            <View
                style={{
                    width: Dimensions.get('window').width * 0.95,
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
                        Paid Calls
                    </Text>
                    <View
                        style={{
                            position: 'absolute',
                            right: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            disabled={moneyCallDetailsScrollViewContentOffsetXState < 100 ? true : false}
                            onPress={() => {
                                moneyCallDetailsScrollViewRefState.current?.scrollTo({ x: moneyCallDetailsScrollViewContentOffsetXState - Dimensions.get('window').width * 0.95, animated: true });
                            }}
                        >
                            <IconMaterialCommunity
                                name="arrow-left-drop-circle"
                                color={moneyCallDetailsScrollViewContentOffsetXState < 100 ? colors.icon : colors.icon}
                                size={30}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={moneyCallDetailsScrollViewContentOffsetXState > Dimensions.get('window').width * 0.95 - 200 ? true : false}
                            onPress={() => {
                                moneyCallDetailsScrollViewRefState.current?.scrollTo({ x: moneyCallDetailsScrollViewContentOffsetXState + Dimensions.get('window').width * 0.95, animated: true });
                            }}
                        >
                            <IconMaterialCommunity
                                name="arrow-right-drop-circle"
                                color={moneyCallDetailsScrollViewContentOffsetXState > Dimensions.get('window').width * 0.95 - 200 ? colors.icon : colors.icon}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    ref={moneyCallDetailsScrollViewRefState}
                    onScroll={(e) => {
                        indexStore.dispatch({ type: SET_DIGITAL_BUSINESS_MONEY_CALL_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X, payload: e.nativeEvent.contentOffset.x })
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
                                alignItems: 'center',
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
                                data={decorateMoneyCallDetailsData(subscriptionDetailsDataState, 1, colors).data}
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
                                    navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'DigitalBusinessDetailsScreen' } });
                                }}
                            //onChange={(event) => console.log(event.nativeEvent)}
                            />
                            <View
                                style={{
                                    width: 200,
                                    paddingRight: 20,
                                    alignItems: 'center'
                                }}
                            >
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    starSize={20}
                                    rating={decorateMoneyCallDetailsData(subscriptionDetailsDataState, 2, colors).stars}
                                    emptyStarColor='#F1C40F'
                                    fullStarColor='#F1C40F'

                                //selectedStar={(stars) => {
                                //console.log('stars: ' + stars)
                                //}}
                                />
                                <Text
                                    style={{
                                        color: colors.text,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {decorateMoneyCallDetailsData(subscriptionDetailsDataState, 2, colors).stars + ' / 5'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'DigitalBusinessDetailsScreen' } });
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'blue',
                                            marginTop: 5,
                                        }}
                                    >
                                        {decorateMoneyCallDetailsData(subscriptionDetailsDataState, 2, colors).reviews + ' reviews'}
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        marginTop: 5
                                    }}
                                >
                                    {decorateMoneyCallDetailsData(subscriptionDetailsDataState, 2, colors).topUsers.map((item, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginTop: 5
                                                }}
                                            >
                                                <Avatar
                                                    rounded
                                                    size={30}
                                                    source={{
                                                        uri: 'https://service8081.moneyclick.com/attachment/getUserFile/' + item.userName,
                                                        method: 'GET',
                                                        headers: headersStore.getState().hmacInterceptorState.process(
                                                            httpRequest.create(
                                                                'https://service8081.moneyclick.com',
                                                                '/attachment/getUserFile/' + item.userName,
                                                                'GET',
                                                                null,
                                                                false
                                                            )).headers,
                                                    }}
                                                    overlayContainerStyle={{
                                                        backgroundColor: 'white',
                                                    }}
                                                    onPress={() => {
                                                        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'UserDataOthersScreen', selectedUserName: item.userName } })
                                                    }}
                                                />
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'UserDataOthersScreen', selectedUserName: item.userName } })
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            marginLeft: 5,
                                                            fontSize: 10,
                                                            color: colors.text
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        fontSize: 10,
                                                        color: colors.text
                                                    }}
                                                >
                                                    {item.amount}$
                                                </Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            width: Dimensions.get('window').width * 0.95,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: 16,
                                paddingBottom: 10,
                            }}
                        >
                            Duration (minutes)
                        </Text>
                        <LineChart
                            style={{
                                flex: 1,
                                height: 170
                            }}
                            data={decorateMoneyCallDetailsData(subscriptionDetailsDataState, 3, colors).data}
                            animation={{ durationX: 2000 }}
                            chartDescription={DESCRIPTION}
                            legend={{ ...LEGEND, textColor: processColor(colors.text) }}
                            xAxis={{
                                valueFormatter: decorateMoneyCallDetailsData(subscriptionDetailsDataState, 3, colors).xAxis,
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
                            //visibleRange={this.state.visibleRange}
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
                            navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'DigitalBusinessDetailsScreen' } });
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
                        data={decorateDonationDetailsData(donationDetailsDataState, 1, colors).data}
                        animation={{ durationX: 2000 }}
                        xAxis={{
                            valueFormatter: decorateDonationDetailsData(donationDetailsDataState, 1, colors).xAxis,
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
                            navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'DigitalBusinessDetailsScreen' } });
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
                            navigateStore.dispatch({ type: NAVIGATE, payload: { target: 'DigitalBusinessDetailsScreen' } });
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
        </ScrollView>
    )
};

const Component = connect(mapStateToProps)(ConnectedComponent);

export default Component;