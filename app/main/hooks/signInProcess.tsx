import React, { useEffect, useRef } from "react"
import { CommonActions } from "@react-navigation/native"
//STORES
import { store as authStore } from "../stores/auth"
//HOOKS
import { getConfig } from "./getConfig"
import { setSecretKey } from "./setSecretKey"
import { signIn } from "./signIn"

const Hook = (areaCode: string, phone: string, password: string, navigation: any) => {

    //INITIAL STATES
    const isMounted = useRef(false)

    //HOOKS CALLS
    const { isLoading: isLoadingSignIn, data: dataSignIn, error: errorSignIn, refetch: refetchSignIn, isSuccess: isSuccessSignIn } =
        signIn(
            areaCode,
            phone,
            password,
            '4454e4d08748617h'
        )

    const { isLoading: isLoadingSetSecretKey, data: dataSetSecretKey, error: errorSetSecretKey, isSuccess: isSuccessSetSecretKey } =
        setSecretKey(
            dataSignIn?.base?.userName || null,
            dataSignIn?.base?.secretKey || null,
            '4454e4d08748617h'
        )
    const { isLoading: isLoadingGetConfig, data: dataGetConfig, error: errorGetConfig, isSuccess: isSuccessGetConfig } =
        getConfig(
            dataSignIn?.base?.userName || null,
        )

    useEffect(() => {
        if (isMounted.current) {
            if (dataGetConfig !== undefined) {
                authStore.dispatch(
                    {
                        type: 'SET_PARAMS',
                        payload:
                        {
                            userName: dataSignIn?.base?.userName,
                            secretKey: dataSignIn?.base?.secretKey,
                            time: new Date().getTime(),
                            config: { ...dataGetConfig, areaCode: areaCode, phone: phone },
                            frequentUsers: dataSignIn?.other.frequentUsers
                        }
                    })
                navigation.dispatch((state) => {
                    const routes = [{ name: 'MainTabScreen' }];
                    return CommonActions.reset({
                        ...state,
                        routes,
                        index: routes.length - 1,
                    });
                });
            }
        } else {
            isMounted.current = true
        }
    }, [dataGetConfig]);

    return {
        run: refetchSignIn,
        isLoading: isLoadingSignIn || isLoadingSetSecretKey || isLoadingGetConfig,
        error: errorSignIn !== null ? errorSignIn : errorSetSecretKey !== null ? errorSetSecretKey : errorGetConfig,
        isSuccess: isSuccessSignIn && isSuccessSetSecretKey && isSuccessGetConfig
    }

}
export const signInProcess = Hook;
