import { createRef } from "react";
import {
    UPDATE_DIGITAL_BUSINESS_FINANCIAL_OVERVIEW_DATA,
    UPDATE_DIGITAL_BUSINESS_SUBSCRIPTION_DETAILS_DATA,
    SET_DIGITAL_BUSINESS_FINANCIAL_SCROLL_VIEW_CONTENT_OFFSET_X,
    SET_DIGITAL_BUSINESS_SUBSCRIPTION_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X,
    SET_DIGITAL_BUSINESS_MONEY_CALL_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X
} from "../../../constants/action-types";

const initialState = {
    financialOverviewDataState: [],
    subscriptionDetailsDataState: {
        users: {
            general: {
                previousActiveOwnPayedSubscriptions: 0,
                previousActiveOwnFreeSubscriptions: 128,
            },
            own: [
                { subscriptionUserName: '584245522788', subscriberUserName: 'nancydemolins', active: true, initialTimestamp: '2022-04-04T00:00:00.000Z' },
                { subscriptionUserName: '584245522788', subscriberUserName: 'pedro', active: true, initialTimestamp: '2022-01-02T00:00:00.000Z' },
                { subscriptionUserName: '584245522788', subscriberUserName: 'pablo', active: true, initialTimestamp: '2022-03-03T00:00:00.000Z' },
                { subscriptionUserName: '584245522788', subscriberUserName: 'pablo1', active: true, initialTimestamp: '2022-05-18T00:22:00.000Z' },
                { subscriptionUserName: '584245522788', subscriberUserName: 'luis', active: false, initialTimestamp: '2022-01-02T00:00:00.000Z' }
            ],
            others: [
                { subscriptionUserName: 'nancydemolina', subscriberUserName: '584245522788', active: true, initialTimestamp: '' },
                { subscriptionUserName: 'pedro', subscriberUserName: '584245522788', active: true, initialTimestamp: '' }
            ],
        },
        premiumUsers: {
            general: {
                previousActiveOwnPayedSubscriptions: 0,
                previousActiveOwnFreeSubscriptions: 23,
            },
            own: [
                { subscriptionUserName: '584245522788', subscriberUserName: 'nancydemolins', active: true, initialTimestamp: '2022-04-04T00:00:00.000Z' },
                { subscriptionUserName: '584245522788', subscriberUserName: 'pedro', active: true, initialTimestamp: '2022-01-02T00:00:00.000Z' },
                { subscriptionUserName: '584245522788', subscriberUserName: 'pablo1', active: true, initialTimestamp: '2022-05-18T00:22:00.000Z' },
                { subscriptionUserName: '584245522788', subscriberUserName: 'luis', active: false, initialTimestamp: '2022-01-02T00:00:00.000Z' }
            ],
            others: [
                { subscriptionUserName: 'nancydemolina', subscriberUserName: '584245522788', active: true, initialTimestamp: '' },
                { subscriptionUserName: 'pedro', subscriberUserName: '584245522788', active: true, initialTimestamp: '' },
                { subscriptionUserName: 'barbara', subscriberUserName: '584245522788', active: true, initialTimestamp: '' }
            ],
        },
        tvShows: {
            general: {
                previousActiveOwnPayedSubscriptions: 18,
                previousActiveOwnFreeSubscriptions: 22,
            },
            own: [
                { id: '34235dfss', subscriptionUserName: '584245522788', subscriberUserName: 'nancydemolina', amount: 10.99, active: true, initialTimestamp: '2021-10-02T00:00:00.000Z', lastTimestamp: '2022-01-02T00:00:00.000Z' },
                { id: '34235dfs1', subscriptionUserName: '584245522788', subscriberUserName: 'pedro', amount: 13.99, active: true, initialTimestamp: '2021-11-02T00:00:00.000Z', lastTimestamp: '2022-03-02T00:00:00.000Z' },
                { id: '34235dfs2', subscriptionUserName: '584245522788', subscriberUserName: 'pablo', amount: 4.99, active: true, initialTimestamp: '2022-04-12T07:01:00.000Z', lastTimestamp: '2022-04-12T07:01:00.000Z' },
                { id: '34235dfs8', subscriptionUserName: '584245522788', subscriberUserName: 'pablo1', amount: 0.00, active: true, initialTimestamp: '2022-05-22T10:04:00.000Z' },
                { id: '34235dfs3', subscriptionUserName: '584245522788', subscriberUserName: 'luis', amount: 1.99, active: false, initialTimestamp: '2022-05-22T10:04:00.000Z', lastTimestamp: '2022-05-22T10:04:00.000Z' }
            ],
            others: [
                { id: '34235dfssd', subscriptionUserName: 'pablo1', subscriberUserName: '584245522788', amount: 3.99, active: true, initialTimestamp: '2022-01-12T07:01:00.000Z', lastTimestamp: '2022-02-12T07:01:00.000Z' }
            ],
        },
        liveStreamings: {
            general: {
                previousActiveOwnPayedSubscriptions: 1,
                previousActiveOwnFreeSubscriptions: 11,
            },
            own: [
                { id: '3423532', subscriptionUserName: '584245522788', subscriberUserName: 'nancydemolina', amount: 15.99, active: true, initialTimestamp: '2021-10-02T00:00:00.000Z', lastTimestamp: '2022-05-02T00:00:00.000Z' },
                { id: '34235577', subscriptionUserName: '584245522788', subscriberUserName: 'pedro', amount: 0.00, active: true, initialTimestamp: '2022-05-22T01:04:00.000Z' },
                { id: '34233hfghf', subscriptionUserName: '584245522788', subscriberUserName: 'pablo', amount: 11.99, active: true, initialTimestamp: '2022-03-22T01:04:00.000Z', lastTimestamp: '2022-05-22T01:04:00.000Z' },
                { id: '3423gdfhfg', subscriptionUserName: '584245522788', subscriberUserName: 'pablo1', amount: 0.00, active: true, initialTimestamp: '2021-09-21T01:07:00.000Z' },
                { id: '342sdsd', subscriptionUserName: '584245522788', subscriberUserName: 'luis', amount: 0.00, active: false, initialTimestamp: '2022-01-22T01:04:00.000Z' }
            ],
            others: [
                { id: '34235dryrtrt', subscriptionUserName: 'pablo1', subscriberUserName: '584245522788', amount: 3.99, active: true, initialTimestamp: '2022-01-22T01:04:00.000Z', lastTimestamp: '2022-04-22T01:04:00.000Z' },
                { id: '34235dryrtrnnn', subscriptionUserName: 'pablo2', subscriberUserName: '584245522788', amount: 12.99, active: true, initialTimestamp: '2022-01-25T11:09:00.000Z', lastTimestamp: '2022-04-25T11:09:00.000Z' }
            ],
        },
    },
    moneyCallDetailsDataState: {
        sended: {
            balance: 0,
            users: [
                { name: 'user1', }
            ],
        },
        received: {
            ownQuantity: 0,
            own: [],
            othersQuantity: 0,
            others: []
        },
    },

    donationDetailsDataState: {
        topCountries: [
            {
                name: 'Venezuela', data: [
                    { amount: 44.04, timestamp: '2022-03-02T00:00:00.000Z' },
                    { amount: 120.00, timestamp: '2022-04-02T00:00:00.000Z' },
                    { amount: 85.18, timestamp: '2022-05-02T00:00:00.000Z' },
                ]
            },
            {
                name: 'Colombia', data: [
                    { amount: 32.03, timestamp: '2022-02-02T00:00:00.000Z' },
                    { amount: 111.57, timestamp: '2022-03-02T00:00:00.000Z' },
                    { amount: 28.00, timestamp: '2022-05-02T00:00:00.000Z' },
                    { amount: 123.90, timestamp: '2022-06-02T00:00:00.000Z' },

                ]
            },
            {
                name: 'Chile', data: [
                    { amount: 22.10, timestamp: '2022-02-02T00:00:00.000Z' },
                    { amount: 93.34, timestamp: '2022-04-02T00:00:00.000Z' },
                    { amount: 98.60, timestamp: '2022-06-02T00:00:00.000Z' },
                ]
            },
            {
                name: 'USA', data: [
                    { amount: 120.02, timestamp: '2022-02-02T00:00:00.000Z' },
                    { amount: 85.45, timestamp: '2022-03-02T00:00:00.000Z' },
                    { amount: 65.76, timestamp: '2022-04-02T00:00:00.000Z' },
                    { amount: 96.38, timestamp: '2022-05-02T00:00:00.000Z' },
                    { amount: 74.00, timestamp: '2022-06-02T00:00:00.000Z' },
                ]
            },
        ],
        topUsers: [
            { name: '584245522788', amount: 44.03, timestamp: '2022-03-02T00:00:00.000Z' },
            { name: '584245522788', amount: 44.03, timestamp: '2022-03-02T00:00:00.000Z' },
            { name: '584245522788', amount: 44.03, timestamp: '2022-03-02T00:00:00.000Z' },
            { name: '584245522788', amount: 44.03, timestamp: '2022-03-02T00:00:00.000Z' },
            { name: '584245522788', amount: 44.03, timestamp: '2022-03-02T00:00:00.000Z' },
        ],
    },
    financialScrollViewRefState: createRef(),
    subscriptionDetailsScrollViewRefState: createRef(),
    moneyCallDetailsScrollViewRefState: createRef(),
    financialScrollViewContentOffsetXState: 0,
    subscriptionDetailsScrollViewContentOffsetXState: 0,
    moneyCallDetailsScrollViewContentOffsetXState: 0,
    isLoadingState: false
};

function rootReducer(state = initialState, action) {
    if (action.type === SET_DIGITAL_BUSINESS_MONEY_CALL_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X) {
        return Object.assign({}, state, {
            token: state.moneyCallDetailsScrollViewContentOffsetXState = action.payload,
        });
    }
    if (action.type === SET_DIGITAL_BUSINESS_FINANCIAL_SCROLL_VIEW_CONTENT_OFFSET_X) {
        return Object.assign({}, state, {
            token: state.financialScrollViewContentOffsetXState = action.payload,
        });
    }
    if (action.type === SET_DIGITAL_BUSINESS_SUBSCRIPTION_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X) {
        return Object.assign({}, state, {
            token: state.subscriptionDetailsScrollViewContentOffsetXState = action.payload,
        });
    }
    if (action.type === UPDATE_DIGITAL_BUSINESS_SUBSCRIPTION_DETAILS_DATA) {
        return Object.assign({}, state, {
            token: state.subscriptionDetailsDataState = action.payload,
        });
    }
    if (action.type === UPDATE_DIGITAL_BUSINESS_FINANCIAL_OVERVIEW_DATA) {
        return Object.assign({}, state, {
            token: state.financialOverviewDataState = action.payload,
        });
    }
    return state;
}

export default rootReducer;