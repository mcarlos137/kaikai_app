import {
  GET_FINANCIAL_OVERVIEW
} from "../../../constants/action-types";
import { headersStore } from "../../../main/store";
import httpRequest from '../../../tools/httpRequest';

export function getFinancialOverviewAction(userName) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/digitalBusiness/getFinancialOverview/' + userName;
  let method = 'GET';
  let hmacInterceptor = headersStore.getState().hmacInterceptorState
  let request = hmacInterceptor.process(httpRequest.create(url, path, method, null, false));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: method,
        headers: request.headers,
      }
    )
      .then(handleErrors)
      .then(response =>
        response.json())
      .then(json => {
        console.log(GET_FINANCIAL_OVERVIEW + ' ' + 'OK')
        dispatch({ type: GET_FINANCIAL_OVERVIEW, payload: json });
      })
      .catch(error => {
        console.log('GET_FINANCIAL_OVERVIEW_STATUS' + ' ' + error)
        dispatch({ type: 'GET_FINANCIAL_OVERVIEW_STATUS', payload: error.message });
      });
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.status);
  }
  return response;
}