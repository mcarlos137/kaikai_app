import { useQuery } from "react-query"
import { request } from "../../../tools/axiosUtils"

const getFastChangeFactorRequest = ({ queryKey }) => {
    console.log('queryKey[1]', queryKey[1])
    console.log('queryKey[2]', queryKey[2])
    return request({ url: `/mcUser/getFastChangeFactor/${queryKey[1]}/${queryKey[2]}`, method: 'get' })
}

export const getFastChangeFactor = (baseCurrency: string, targetCurrency: string) => {
    return useQuery(
        ['fastChangeFactor', baseCurrency, targetCurrency],
        getFastChangeFactorRequest,
        {
            enabled: true,
            select: (data) => data?.data
            //keepPreviousData: true
        }
    )
}
