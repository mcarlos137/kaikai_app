import { useQuery } from "react-query"
import { request } from "../../../tools/axiosUtils"

const postOfferRequest = ({ queryKey }) => {
  let body: any = {
    userName: queryKey[1],
    nickName: queryKey[2],
    pair: queryKey[3],
    amount: queryKey[4],
    price: queryKey[5],
    type: queryKey[6],
    time: queryKey[7],
    timeUnit: queryKey[8],
    excludeMessage: true,
  }
  if (queryKey[9] !== null) body.subscriptionId = queryKey[9]
  return request({ url: `/moneyMarket/postOffer`, method: 'post', data: body })
}

export const postOffer = (
  userName: string,
  nickName: string,
  pair: string,
  amount: number,
  price: number,
  type: string,
  time: number,
  timeUnit: string,
  subscriptionId: string | null
) => {
  return useQuery(
    ['postOffer', userName, nickName, pair, amount, price, type, time, timeUnit, subscriptionId],
    postOfferRequest,
    {
      enabled: false,
      select: (data) => data?.data,
      onSuccess: (data) => {
        console.log('data', JSON.stringify(data, null, 4));
      }
      //keepPreviousData: true
    }
  )
}

/****
 * 
 * 
 * export function postMoneyMarketOfferAction(userName, nickName, pair, amount, price, type, time, timeUnit, subscriptionId) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/moneyMarket/postOffer';
  let method = 'POST';
  let body = {
    userName: userName,
    nickName: nickName,
    pair: pair,
    amount: amount,
    price: price,
    type: type,
    time: time,
    timeUnit: timeUnit,
    excludeMessage: true,
  }
  if(subscriptionId !== null){
    body.subscriptionId = subscriptionId
  }
  let hmacInterceptor = headersStore.getState().hmacInterceptorState
  let request = hmacInterceptor.process(httpRequest.create(url, path, method, body, false));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: method,
        headers: request.headers,
        body: JSON.stringify(body)
      }
    )
      .then(handleErrors)
      .then(response =>
        response.text())
      .then(text => {
        console.log(POST_MONEY_MARKET_OFFER + ' ' + 'OK')
        dispatch({ type: POST_MONEY_MARKET_OFFER, payload: text });
      })
      .catch(error => {
        console.log('POST_MONEY_MARKET_OFFER_STATUS' + ' ' + error)
        dispatch({ type: 'POST_MONEY_MARKET_OFFER_STATUS', payload: error.message });
      });
  };
}

 * 
 * 
 * 
 * 
 */