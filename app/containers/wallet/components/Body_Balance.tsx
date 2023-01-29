import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Avatar } from '@rneui/themed';
import { NumericFormat } from 'react-number-format';
import { useTheme } from 'react-native-paper';
//FUNCTIONS
import { formatValue, getRequire } from '../../../main/functions';

const Component = ({ data }) => {

  //INITIAL FUNCTIONS
  const imgs: string[] = []
  let usdEstimatedBalance = 0
  data?.detailedBalances.map((value, key) => {
    imgs.push(value.img)
    if (value?.usdEstimatedBalance) {
      usdEstimatedBalance = usdEstimatedBalance + value.usdEstimatedBalance
    }
  })

  //HOOKS CALLS
  const { colors } = useTheme<any>()

  return (
    <>
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imgs.map((value, key) => {
          return (
            <Avatar
              key={key}
              size="medium"
              rounded
              source={getRequire(value)}
              overlayContainerStyle={{
                backgroundColor: "white",
              }}
            />
          );
        })}
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            color: colors.text,
            fontSize: Dimensions.get("window").width * 0.03,
          }}
        >
          {"Estimated Balance in USD ($) : "}
        </Text>
        <NumericFormat
          value={formatValue(usdEstimatedBalance)}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={2}
          renderText={(value) => (
            <Text
              style={{
                color: colors.text,
                fontSize: Dimensions.get("window").width * 0.03,
                fontWeight: "bold",
              }}
            >
              {"$ " + value}
            </Text>
          )}
        />
      </View>
    </>
  )
};

export default React.memo(Component)