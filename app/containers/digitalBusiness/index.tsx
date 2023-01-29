//PRINCIPAL
import React, { useEffect } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { compose } from 'redux';
//HOC
import { withColors, withHmacInterceptor, withUserName } from '../../main/hoc';
//HOOKS
import { getFinancialOverview } from '../../main/hooks/getFinancialOverview';
//COMPONENTS
import Body_Overview from './components/Body_Overview'
import Body_Subscriptions from './components/Body_Subscriptions'

const DigitalBusinessScreen = ({ navigation, route, colors, userName, hmacInterceptor }) => {

  //HOOKS CALLS
  const { isLoading: isLoadingFinancialOverview, data: dataFinancialOverview, error: errorFinancialOverview } =
    getFinancialOverview(userName)

  //EFFECTS
  useEffect(() => {
    console.log('DigitalBusinessScreen', route.params)
    /**
      indexStore.dispatch({ type: SET_DIGITAL_BUSINESS_SUBSCRIPTION_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X, payload: 0 })
      indexStore.dispatch({ type: SET_DIGITAL_BUSINESS_MONEY_CALL_DETAILS_SCROLL_VIEW_CONTENT_OFFSET_X, payload: 0 })

     */
  }, []);

  //PRINCIPAL RENDER
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
      <Body_Overview
        data={dataFinancialOverview}
      />
      <Body_Subscriptions
        data={{}}
      />
    </ScrollView>
  );
};

export default React.memo(compose(withColors, withUserName, withHmacInterceptor)(DigitalBusinessScreen));
