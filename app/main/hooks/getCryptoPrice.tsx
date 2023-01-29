import { useQuery } from "react-query"
import { request } from "../../tools/axiosUtils"

const getCryptoPriceRequest = ({queryKey}) => {
    return request({ url: `/mcUser/getCryptoPrice/${queryKey[1]}/${queryKey[2]}`, method: 'get' })
}

export const getCryptoPrice = (cryptoCurrency: string, fiatCurrency: string) => {
    return useQuery(
        ['cryptoPrice', cryptoCurrency, fiatCurrency],
        getCryptoPriceRequest,
        {
            enabled: true
            //keepPreviousData: true
        }
    )
}