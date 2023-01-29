import React from 'react';
import {
    View,
    SafeAreaView,
    Platform
} from 'react-native';
import { compose } from 'redux'
//HOC
import { withColors } from '../hoc';
//STORES
import { store as actionSheetOptionsStore } from '../stores/actionSheetOptions';
//COMPONENTS
import ActionSheetOptions from './ActionSheetOptions'

const Component = ({ name, children, navigation, route, colors }) => {

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: name === 'Social' ? 'black' : colors.background,
                marginTop: Platform.OS === 'android' ? 60 : 0
            }}
        >
            <SafeAreaView style={{ marginBottom: 40 }} />
            {children}
            {name === 'Social' && <ActionSheetOptions navigation={navigation} route={route} customRef={actionSheetOptionsStore.getState().ref1} />}
            {name === 'Subs' && <ActionSheetOptions navigation={navigation} route={route} customRef={actionSheetOptionsStore.getState().ref2} />}
            {name === 'Wallet' && <ActionSheetOptions navigation={navigation} route={route} customRef={actionSheetOptionsStore.getState().ref3} />}
            {name === 'UserData' && <ActionSheetOptions navigation={navigation} route={route} customRef={actionSheetOptionsStore.getState().ref4} />}
        </View>
    )
};

export default React.memo(compose(withColors)(Component));