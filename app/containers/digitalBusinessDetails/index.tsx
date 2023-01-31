import React, { useEffect } from "react";
import { View } from "react-native";

const DigitalBusinessDetailsScreen = ({navigation, route}) => {

    useEffect(() => {
        console.log('DigitalBusinessDetailsScreen', route.params)
    }, [])

    return (
        <View>

        </View>
    )

}

export default React.memo(DigitalBusinessDetailsScreen)