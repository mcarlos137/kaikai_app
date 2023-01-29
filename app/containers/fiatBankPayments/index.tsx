//PRINCIPAL
import React, { useEffect, useState, Fragment } from 'react';
import { Dimensions, RefreshControl, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { compose } from 'redux'
//HOOKS
import { getPayments } from '../../main/hooks/getPayments';
import { StackActions } from '@react-navigation/native';
import { getFieldName } from '../../main/functions';
import { withColors, withUserName } from '../../main/hoc';
//COMPONENTS

const FiatBankPaymentsScreen = ({ navigation, route, colors, userName }) => {

  //INITIAL STATES
  const [activeSections, setActiveSections] = useState([0])
  const [data, setData] = useState([])

  //HOOKS CALLS
  const { isLoading: isLoadingPayments, data: dataPayments, error: errorPayments } =
    getPayments(userName, route?.params?.selectedCurrency?.value)

  //EFFECTS
  useEffect(() => {
    console.log('FiatBankPaymentsScreen', route.params)
  }, []);

  //COMPONENTS
  const renderHeader = (title, expanded) => (
    <View
      style={{
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: colors.primaryBackground
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontWeight: 'bold'
        }}
      >
        {title}
      </Text>
      {
        expanded ? (
          <MaterialCommunityIcons
            name="chevron-up"
            color={colors.icon}
            size={18}
          />
        ) : (
          <MaterialCommunityIcons
            name="chevron-down"
            color={colors.icon}
            size={18}
          />
        )
      }
    </View >
  )

  const renderContent = (section) => {
    return (
      <ScrollView>
        {section.data.map((item, index) => {
          return (
            <Fragment
              key={index}
            >
              <View
                style={{
                  backgroundColor: colors.secundaryBackground,
                  borderRadius: 10,
                  padding: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 5,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(StackActions.push('FiatBankTransfersScreen', { ...route.params, selectedPayment: item }))
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'column'
                    }}>
                    {delete item.messages}
                    {/*delete item.type*/}
                    {/*delete item.id*/}
                    {/*delete item.currency*/}
                    {/*delete item.automaticCharge*/}
                    {/*delete item.verified*/}
                    {/*delete item.mcVerified*/}
                    {Object.keys(item).filter(key =>
                      key !== 'id' &&
                      key !== 'type' &&
                      key !== 'currency' &&
                      key !== 'automaticCharge' &&
                      key !== 'verified' &&
                      key !== 'mcVerified' &&
                      key !== 'own'
                    ).map((key, i) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={{
                            color: colors.text,
                            fontWeight: 'bold',
                            fontSize: 12,
                            alignSelf: "flex-start",
                          }}
                        >
                          {getFieldName(key)}:
                        </Text>
                        <Text
                          style={{
                            color: colors.text,
                            fontSize: 12,
                            alignSelf: "flex-start",
                            marginLeft: 3
                          }}
                        >
                          {item[key]}
                        </Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              </View>
            </Fragment>
          )
        })}
      </ScrollView>
    )
  }

  return (
    <View style={{
      flex: 1
    }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {

            }}
            tintColor={colors.getRandomMain()}
            colors={[colors.getRandomMain()]}
          />
        }
        style={{
          marginTop: 20,
          width: Dimensions.get('window').width * 0.9,
          alignSelf: 'center',
        }}>
        <Accordion
          sections={dataPayments}
          activeSections={activeSections}
          underlayColor={'transparent'}
          renderHeader={(section, i, isActive, sections) => (renderHeader(section.title, isActive))}
          renderContent={renderContent}
          onChange={(activeSects) => {
            setActiveSections(activeSects)
          }}
        />
      </ScrollView>
    </View>
  );
};

export default React.memo(compose(withColors, withUserName)(FiatBankPaymentsScreen));

