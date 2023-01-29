//PRINCIPAL
import React, { Fragment } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from 'react-native-modal';
import { NumericFormat } from "react-number-format";
import FastImage from "react-native-fast-image";
import { useTheme } from "react-native-paper";
//FUNCTIONS
import {
  getFieldName,
} from "../functions";

const Component = ({
  data,
  visible,
  confirmationModalMessage,
  color,
  onPressAccept,
  onPressCancel,
  onPressClose
}) => {
  const { colors } = useTheme<any>();
  return (
    <Modal
      isVisible={visible}
      style={{ margin: 0, alignItems: 'center', justifyContent: 'flex-end' }}
      backdropColor={colors.backdrop}
      backdropOpacity={0}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
    >
      <ScrollView
        style={{
          marginBottom: 10,
        }}
        persistentScrollbar={true}
      >
        <View
          style={{
            backgroundColor: color,
            width: Dimensions.get("window").width,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {"Operation Data"}
          </Text>
        </View>
        <View
          style={{
            width: Dimensions.get("window").width,
            backgroundColor: colors.background,
            height: 800
          }}
        >
          <View
            style={{
              margin: 10,
              padding: 10,
              backgroundColor: colors.primaryBackground,
              borderRadius: 10
            }}
          >
            {data.map((item, key) => {
              return (
                <Fragment key={key}>
                  {item.title !== "" && (
                    <Text
                      style={{
                        color: colors.text,
                        fontWeight: "bold",
                        paddingLeft: 10,
                        paddingTop: 10,
                      }}
                    >
                      {item.title}
                    </Text>
                  )}
                  {item.type === "TEXT" && (
                    <Text
                      style={{
                        color: colors.text,
                        paddingLeft: 15,
                      }}
                    >
                      {item.value}
                    </Text>
                  )}
                  {item.type === "NUMERIC" && (
                    <NumericFormat
                      value={item.value}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={item.valueDecimals}
                      renderText={(value) => (
                        <Text
                          style={{
                            color: colors.text,
                            paddingLeft: 10,
                          }}
                        >
                          {item.valuePreffix + " " + value + " " + item.valueSuffix}
                        </Text>
                      )}
                    />
                  )}
                  {item.type === "JSON" && (
                    <>
                      {Object.keys(item.value)
                        .filter(
                          (key) =>
                            key !== "id" &&
                            key !== "type" &&
                            key !== "currency" &&
                            key !== "automaticCharge" &&
                            key !== "verified" &&
                            key !== "mcVerified" &&
                            key !== "own"
                        )
                        .map((key, i) => (
                          <Text
                            style={{
                              color: colors.text,
                              fontSize: 12,
                              alignSelf: "flex-start",
                              paddingLeft: 12,
                            }}
                            key={i}
                          >
                            {getFieldName(key)}: {item.value[key]}
                          </Text>
                        ))}
                    </>
                  )}
                  {item.type === "ASSET" && (
                    <FastImage
                      style={{
                        //flex: 1,
                        padding: 10,
                        marginLeft: 15,
                        marginTop: 5,
                        width: 100,
                        height: 100,
                      }}
                      source={item.value}
                    />
                  )}
                </Fragment>
              );
            })}
            <View style={{ height: 10 }} />
          </View>
          {confirmationModalMessage === "" ? (
            <View
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 20,
              }}
            >
              <View>{/* PRE MESSAGE */}</View>
              <TouchableOpacity
                style={{
                  backgroundColor: color,
                  padding: 10,
                  borderRadius: 10
                }}
                onPress={onPressAccept}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                  }}
                >
                  ACCEPT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: 'transparent',
                  borderColor: colors.border,
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 10
                }}
                onPress={onPressCancel}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: colors.text,
                  }}
                >
                  CANCEL
                </Text>
              </TouchableOpacity>
              {/*this.state.sendRequest === true && (
                                        <Spinner color={constants.PRIMARY_COLOR} />
                                    )*/}
            </View>
          ) : (
            <View>
              <View
                style={[
                  { paddingTop: 20, paddingBottom: 20 },
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    alignContent: "center",
                    marginBottom: 10,
                  },
                ]}
              >
                {confirmationModalMessage.includes("OK") ? (
                  <View>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: Dimensions.get("window").width * 0.04,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        alignContent: "center",
                      }}
                    >
                      {"Successful Operation"}
                    </Text>
                    {confirmationModalMessage.includes("__") && (
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: Dimensions.get("window").width * 0.04,
                          paddingBottom: 10,
                          paddingLeft: 10,
                          paddingRight: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          alignSelf: "center",
                          alignContent: "center",
                        }}
                      >
                        {"id"} {confirmationModalMessage.split("__")[1]}
                      </Text>
                    )}
                  </View>
                ) : (
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: Dimensions.get("window").width * 0.04,
                      paddingBottom: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      alignContent: "center",
                    }}
                  >
                    {confirmationModalMessage}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: color,
                  marginTop: 20,
                }}
                onPress={onPressClose}
              /*onPress={() => {
                navigateToHome();
              }}*/
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    padding: 10,
                  }}
                >
                  CLOSE
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </Modal>
  )
};

export default React.memo(Component);
