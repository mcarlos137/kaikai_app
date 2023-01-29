//PRINCIPAL
import {
    Platform,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
//STORES
import {
    overviewDataStore,
    overviewIdStore,
    shareStore,
    changeStatusStore
} from '../store';
import {
    shortsPersistedStore as socialShortsPersistedStore,
} from '../../social/store'
import {
    authPersistedStore,
} from '../../../main/store'
//ACTIONS
import {
    PUSH_SOCIAL_SHORTS_DATA,
    PUSH_SOCIAL_SHORTS_UNPROCESSED_DATA,
    SET_SOCIAL_SHORTS_DATA_ID,
    SHIFT_SOCIAL_SHORTS_UNPROCESSED_DATA,
    SHARE_SHORTS,
    CHANGE_STATUS_SHORTS,
    GET_SHORTS_OVERVIEW_ID,
    GET_SHORTS_OVERVIEW_DATA,
} from '../../../constants/action-types';
import { overviewDataAction } from '.';
import { checkResponseErrors } from '../../../main/functions';

export function subscribeOverviewIdStore() {
    const unsubscribe = overviewIdStore.subscribe(() => {
        if (checkResponseErrors(overviewIdStore.getState().overviewIdStatusState, GET_SHORTS_OVERVIEW_ID)) return
        console.log('RECEIVING OVERVIEW ID SHORTS');
        if (
            socialShortsPersistedStore.getState().shortsDataIdState !== overviewIdStore.getState().overviewIdState ||
            socialShortsPersistedStore.getState().shortsUnprocessedDataState.length === 0
        ) {
            socialShortsPersistedStore.dispatch({ type: SET_SOCIAL_SHORTS_DATA_ID, payload: overviewIdStore.getState().overviewIdState })
            overviewDataStore.dispatch(overviewDataAction(authPersistedStore.getState().userNameState))
        }
    })
    return unsubscribe;
}

export function subscribeOverviewDataStore() {
    const unsubscribe = overviewDataStore.subscribe(() => {
        if (checkResponseErrors(overviewDataStore.getState().overviewDataStatusState, GET_SHORTS_OVERVIEW_DATA)) return
        console.log('RECEIVING OVERVIEW DATA SHORTS');
        if (socialShortsPersistedStore.getState().shortsUnprocessedDataState.length < 300) {
            overviewDataStore.getState().overviewDataState.map((item, index) => {
                var shortsItem
                Object.entries(socialShortsPersistedStore.getState().shortsUnprocessedDataState).every(function (element, index) {
                    if (element[1].id === item.id) {
                        element[1].reactions = item.reactions
                        element[1].commentsCount = item.commentsCount
                        element[1].donationsAmountUSD = item.donationsAmountUSD
                        element[1].subscribed = item.subscribed
                        element[1].notification = item.notification
                        element[1].liked = item.liked
                        element[1].sharesCount = item.sharesCount
                        element[1].viewsCount = item.viewsCount
                        element[1].reactionsCount = item.reactionsCount
                        element[1].comments = item.comments
                        element[1].allowMoneyCalls = item.allowMoneyCalls
                        element[1].moneyCallRate = item.moneyCallRate
                        element[1].userSubscribers = item.userSubscribers
                        shortsItem = element[1]
                        return false;
                    } else {
                        return true;
                    }
                })
                if (shortsItem !== undefined) {
                    return true
                }
                Object.entries(socialShortsPersistedStore.getState().shortsDataState).every(function (element, index) {
                    if (element[1].id === item.id) {
                        element[1].reactions = item.reactions
                        element[1].commentsCount = item.commentsCount
                        element[1].donationsAmountUSD = item.donationsAmountUSD
                        element[1].subscribed = item.subscribed
                        element[1].notification = item.notification
                        element[1].liked = item.liked
                        element[1].sharesCount = item.sharesCount
                        element[1].viewsCount = item.viewsCount
                        element[1].reactionsCount = item.reactionsCount
                        element[1].comments = item.comments
                        element[1].allowMoneyCalls = item.allowMoneyCalls
                        element[1].moneyCallRate = item.moneyCallRate
                        element[1].userSubscribers = item.userSubscribers
                        shortsItem = element[1]
                        return false;
                    } else {
                        return true;
                    }
                })
                if (shortsItem !== undefined) {
                    return true
                }
                socialShortsPersistedStore.dispatch({ type: PUSH_SOCIAL_SHORTS_UNPROCESSED_DATA, payload: item })
            })
        }
        var i = 0
        var positions = []
        while (i < (5 - socialShortsPersistedStore.getState().shortsDataState.length)) {
            if (socialShortsPersistedStore.getState().shortsUnprocessedDataState.length < (i + 1)) {
                return
            }
            positions.push(i)
            i++
        }
        positions.map((item, index) => {
            var positionItem = socialShortsPersistedStore.getState().shortsUnprocessedDataState[item]
            RNFetchBlob.config({
                fileCache: true,
                appendExt: 'mp4',
            })
                .fetch('GET', 'https://service8081.moneyclick.com/shorts/getAttachment/' + positionItem.videoFileName)
                .then(res => {
                    positionItem.uri = (Platform.OS === 'android') ? 'file://' + res.path() : res.path()
                    socialShortsPersistedStore.dispatch({ type: PUSH_SOCIAL_SHORTS_DATA, payload: positionItem })
                });
        })
        socialShortsPersistedStore.dispatch({ type: SHIFT_SOCIAL_SHORTS_UNPROCESSED_DATA, payload: positions.length })
    })
    return unsubscribe;
}

export function subscribeShareStore() {
    const unsubscribe = shareStore.subscribe(() => {
        if (checkResponseErrors(shareStore.getState().shareStatusState, SHARE_SHORTS)) return
        console.log('RECEIVING SHARE SHORTS');
        console.log('>>>>>>>>>> ' + shareStore.getState().shareState);
    })
    return unsubscribe;
}

export function subscribeChangeStatusStore() {
    const unsubscribe = changeStatusStore.subscribe(() => {
        if (checkResponseErrors(changeStatusStore.getState().changeStatusStatusState, CHANGE_STATUS_SHORTS)) return
        console.log('RECEIVING CHANGE STATUS SHORTS');
        console.log('>>>>>>>>>> ' + changeStatusStore.getState().changeStatusState);
    })
    return unsubscribe;
}