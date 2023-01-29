import React from 'react';
import { Dimensions, View, Text } from 'react-native'
import { withColors } from '../../../main/hoc';
//FUNCTIONS
const formatPaymentFields = (payment) => {
  var paymentFields: any[] = []
  Object.keys(payment).forEach((key) => {
    var field = { key: key, value: payment[key] }
    paymentFields.push(field)
  });
  return paymentFields
}

const Component: any = ({ selectedPayment, colors }) => {

  //PRINCIPAL RENDER
  return (
    <>
      {selectedPayment !== undefined && JSON.stringify(selectedPayment) !== JSON.stringify({}) &&
        <View
          style={{
            backgroundColor: colors.primaryBackground,
            marginTop: 10,
            borderRadius: 10,
            alignSelf: 'center',
            width: Dimensions.get('window').width * 0.9,
            padding: 10,
          }}>
          {selectedPayment.type !== undefined &&
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  flex: 0.4,
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: colors.text
                }}
              >
                Type:
              </Text>
              <Text
                style={{
                  flex: 0.6,
                  fontSize: 11,
                  color: colors.text
                }}
              >
                {selectedPayment.type}
              </Text>
            </View>}
          {selectedPayment.type !== selectedPayment.bank &&
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5
              }}
            >
              <Text
                style={{
                  flex: 0.4,
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: colors.text
                }}
              >
                Bank:
              </Text>
              <Text
                style={{
                  flex: 0.6,
                  fontSize: 11,
                  color: colors.text
                }}
              >
                {selectedPayment.bank}
              </Text>
            </View>}
          {delete selectedPayment.active}
          {delete selectedPayment.acceptIn}
          {delete selectedPayment.acceptOut}
          {delete selectedPayment.joinField}
          {delete selectedPayment.joinMyPayments}
          {delete selectedPayment.joinFieldValue}
          {delete selectedPayment.messages}
          {delete selectedPayment.sendToPayments}
          {delete selectedPayment.buyBalance}
          {delete selectedPayment.restrictedDeposits}
          {delete selectedPayment.payWindow}
          {delete selectedPayment.text}
          {delete selectedPayment.description}
          {delete selectedPayment.id}
          {delete selectedPayment.value}
          {formatPaymentFields(selectedPayment).map((item, index) => {
            if (item.key !== 'bank' && item.key !== 'type') {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginTop: 5
                  }}
                >
                  <Text
                    style={{
                      flex: 0.4,
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: colors.text
                    }}
                  >
                    {item.key.charAt(0).toUpperCase() + item.key.slice(1)}:
                  </Text>
                  <Text
                    style={{
                      flex: 0.6,
                      fontSize: 11,
                      color: colors.text
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              )
            }
          })}
        </View>}
    </>
  )
};

export default React.memo(withColors(Component))