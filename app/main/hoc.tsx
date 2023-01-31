import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from 'react-native-paper';
import { store as authStore } from "./stores/auth";
import { store as balanceStore } from "./stores/balance";
import { store as headersStore } from "./stores/headers";

export const withNavigation = (WrappedComponent) => {
    const WithComponent = props => {
        const navigation = useNavigation()
        return (
            <>
                <WrappedComponent navigation={navigation} {...props} />
            </>
        );
    }
    return WithComponent;
};

export const withRoute = (WrappedComponent) => {
    const WithComponent = props => {
        const route = useRoute()
        return (
            <>
                <WrappedComponent route={route} {...props} />
            </>
        );
    }
    return WithComponent;
};

export const withColors = (WrappedComponent) => {
    const WithComponent = props => {
        const { colors } = useTheme<any>();
        return (
            <>
                <WrappedComponent colors={colors} {...props} />
            </>
        );
    }
    return WithComponent;
};

export const withUserName = (WrappedComponent) => {
    const WithComponent = props => {
        const { userName } = authStore.getState()
        return (
            <>
                <WrappedComponent userName={userName} {...props} />
            </>
        );
    }
    return WithComponent;
};

export const withConfig = (WrappedComponent) => {
    const WithComponent = props => {
        const { config } = authStore.getState()
        return (
            <>
                <WrappedComponent config={config} {...props} />
            </>
        );
    }
    return WithComponent;
};

export const withHmacInterceptor = (WrappedComponent) => {
    const WithComponent = props => {
        const { hmacInterceptor } = headersStore.getState()
        return (
            <>
                <WrappedComponent hmacInterceptor={hmacInterceptor} {...props} />
            </>
        );
    }
    return WithComponent;
};


export const withDetailedBalances = (WrappedComponent) => {
    const WithComponent = props => {
        const { detailedBalances } = balanceStore.getState()
        return (
            <>
                <WrappedComponent detailedBalances={detailedBalances} {...props} />
            </>
        );
    }
    return WithComponent;
};
