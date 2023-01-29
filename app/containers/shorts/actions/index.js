import {
  LIST_SHORTS,
  GET_SHORTS_OVERVIEW_DATA,
  GET_SHORTS_OVERVIEW_ID,
  CREATE_SHORTS,
  ADD_SHORTS_COMMENT,
  GET_SHORTS_COMMENTS,
  SHARE_SHORTS,
  REACT_SHORTS,
  VIEW_SHORTS
} from "../../../constants/action-types";
import httpRequest from '../../../tools/httpRequest';


export function overviewDataAction(userName) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/shorts/overviewData/' + userName;
  let method = 'GET';
  //let hmacInterceptor = headersStore.getState().hmacInterceptorState
  //let request = hmacInterceptor.process(httpRequest.create(url, path, method, null, false));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: method,
        //headers: request.headers
      }
    )
      .then(handleErrors)
      .then(response =>
        response.json())
      .then(json => {
        console.log(GET_SHORTS_OVERVIEW_DATA + ' ' + 'OK')
        dispatch({ type: GET_SHORTS_OVERVIEW_DATA, payload: json });
      })
      .catch(error => {
        console.log('GET_SHORTS_OVERVIEW_DATA_STATUS' + ' ' + error)
        dispatch({ type: 'GET_SHORTS_OVERVIEW_DATA_STATUS', payload: error.message });
      });
  };
}

export function overviewIdAction(userName) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/shorts/overviewId/' + userName;
  let method = 'GET';
  //let hmacInterceptor = headersStore.getState().hmacInterceptorState
  //let request = hmacInterceptor.process(httpRequest.create(url, path, method, null, false));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: method,
        //headers: request.headers
      }
    )
      .then(handleErrors)
      .then(response =>
        response.text())
      .then(text => {
        console.log(GET_SHORTS_OVERVIEW_ID + ' ' + 'OK')
        dispatch({ type: GET_SHORTS_OVERVIEW_ID, payload: text });
      })
      .catch(error => {
        console.log('GET_SHORTS_OVERVIEW_ID_STATUS' + ' ' + error)
        dispatch({ type: 'GET_SHORTS_OVERVIEW_ID_STATUS', payload: error.message });
      });
  };
}


export function shareAction(id, userName, name) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/shorts/share';
  let method = 'PUT';
  let body = {
    id: id,
    userName: userName,
    name: name
  }
  //let hmacInterceptor = headersStore.getState().hmacInterceptorState
  //let request = hmacInterceptor.process(httpRequest.create(url, path, method, body, false));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: method,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(body)
      }
    )
      .then(handleErrors)
      .then(response =>
        response.text())
      .then(text => {
        console.log(SHARE_SHORTS + ' ' + 'OK')
        dispatch({ type: SHARE_SHORTS, payload: text });
      })
      .catch(error => {
        console.log('SHARE_SHORTS_STATUS' + ' ' + error)
        dispatch({ type: 'SHARE_SHORTS_STATUS', payload: error.message });
      });
  };
}


