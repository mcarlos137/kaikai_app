import {
  GET_USER_VERIFICATION_FIELDS,
  START_USER_VERIFICATION,
  ADD_USER_ATTACHMENT,
  ADD_USER_INFO,
  MODIFY_USER_INFO,
  GET_USER_VERIFICATIONS,
  GET_CONFIG_VERIFICATION,
  GET_USER_VERIFICATION_MESSAGES,
  START_USER_VERIFICATION_EMAIL
} from "../../../constants/action-types";
import { headersStore } from "../../../main/store";
import httpRequest from '../../../tools/httpRequest';

export function getUserVerificationFieldsAction(type) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/user/getUserVerificationFieldsNew/' + type;
  let method = 'GET';
  //let hmacInterceptor = headersStore.getState().hmacInterceptorState
  //let request = hmacInterceptor.process(httpRequest.create(url, path, method, null, false));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(handleErrors)
      .then(response =>
        response.json())
      .then(json => {
        console.log(GET_USER_VERIFICATION_FIELDS + ' ' + 'OK')
        dispatch({ type: GET_USER_VERIFICATION_FIELDS, payload: json });
      })
      .catch(error => {
        console.log('GET_USER_VERIFICATION_FIELDS_STATUS' + ' ' + error)
        dispatch({ type: 'GET_USER_VERIFICATION_FIELDS_STATUS', payload: error.message });
      });
  };
}

export function getUserVerificationMessagesAction(type) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/user/getUserVerificationMessages/' + type;
  let method = 'GET';
  //let hmacInterceptor = headersStore.getState().hmacInterceptorState
  //let request = hmacInterceptor.process(httpRequest.create(url, path, method, null, false));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(handleErrors)
      .then(response =>
        response.json())
      .then(json => {
        console.log(GET_USER_VERIFICATION_MESSAGES + ' ' + 'OK')
        dispatch({ type: GET_USER_VERIFICATION_MESSAGES, payload: json });
      })
      .catch(error => {
        console.log('GET_USER_VERIFICATION_MESSAGES_STATUS' + ' ' + error)
        dispatch({ type: 'GET_USER_VERIFICATION_MESSAGES_STATUS', payload: error.message });
      });
  };
}

export function startUserVerificationAction(userName, info, fieldNames, userVerificationType) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/user/startVerification';
  let method = 'POST';
  let body = {
    userName: userName,
    info: info,
    fieldNames: fieldNames,
    userVerificationType: userVerificationType
  };
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
        console.log(START_USER_VERIFICATION + ' ' + text)
        dispatch({ type: START_USER_VERIFICATION, payload: text });
      })
      .catch(error => {
        console.log('START_USER_VERIFICATION_STATUS' + ' ' + error)
        dispatch({ type: 'START_USER_VERIFICATION_STATUS', payload: error.message });
      });
  };
}

export function startUserVerificationEmailAction(userName, info) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/user/startVerificationEmail';
  let method = 'POST';
  let body = {
    userName: userName,
    info: info,
  };
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
        console.log(START_USER_VERIFICATION_EMAIL + ' ' + text)
        dispatch({ type: START_USER_VERIFICATION_EMAIL, payload: text });
      })
      .catch(error => {
        console.log('START_USER_VERIFICATION_EMAIL_STATUS' + ' ' + error)
        dispatch({ type: 'START_USER_VERIFICATION_EMAIL_STATUS', payload: error.message });
      });
  };
}

export function addUserInfoAction(userName, fieldName, fieldValue, fieldValueArray, type, processId) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/user/addInfo';
  let method = 'POST';
  let body = {
    userName: userName,
    fieldName: fieldName,
  };
  if (fieldValue !== null) {
    body.fieldValue = fieldValue
  }
  if (fieldValueArray !== null) {
    body.fieldValueArray = fieldValueArray
  }
  if (type !== null) {
    body.type = type
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
        console.log(ADD_USER_INFO + ' ' + 'OK')
        dispatch({ type: ADD_USER_INFO, payload: { response: text, processId: processId } });
      })
      .catch(error => {
        console.log('ADD_USER_INFO_STATUS' + ' ' + error)
        dispatch({ type: 'ADD_USER_INFO_STATUS', payload: error.message });
      });
  };
}

export function modifyUserInfoAction(userName, fieldName, fieldValue, fieldValueArray, type) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/user/modifyInfo';
  let method = 'PUT';
  let body = {
    userName: userName,
    fieldName: fieldName,
  };
  if (fieldValue !== null) {
    body.fieldValue = fieldValue
  }
  if (fieldValueArray !== null) {
    body.fieldValueArray = fieldValueArray
  }
  if (type !== null) {
    body.type = type
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
        console.log(MODIFY_USER_INFO + ' ' + 'OK')
        dispatch({ type: MODIFY_USER_INFO, payload: text });
      })
      .catch(error => {
        console.log('MODIFY_USER_INFO_STATUS' + ' ' + error)
        dispatch({ type: 'MODIFY_USER_INFO_STATUS', payload: error.message });
      });
  };
}

export function addUserAttachmentAction(userName, fieldName, attachmentName, uri, mimeType, type, processId, target) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/userAddAttachment';
  let method = 'POST';
  const formData = new FormData();
  formData.append(
    'attachment',
    {
      uri: uri,
      name: attachmentName + '.' + mimeType.split('/')[1],
      type: mimeType,
    },
    attachmentName
  );
  formData.append('userName', userName);
  formData.append('fieldName', fieldName);
  if (type !== null) {
    formData.append('type', type);
  }
  let hmacInterceptor = headersStore.getState().hmacInterceptorState
  let request = hmacInterceptor.process(httpRequest.create(url, path, method, formData, true));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: method,
        headers: request.headers,
        body: formData
      }
    )
      .then(handleErrors)
      .then(response =>
        response.text())
      .then(text => {
        console.log(ADD_USER_ATTACHMENT + ' ' + 'OK')
        dispatch({ type: ADD_USER_ATTACHMENT, payload: { response: text, processId: processId, target: target } });
      })
      .catch(error => {
        console.log('ADD_USER_ATTACHMENT_STATUS' + ' ' + error)
        dispatch({ type: 'ADD_USER_ATTACHMENT_STATUS', payload: error.message });
      });
  };
}

export function getUserVerificationsAction(userName, verificationStatus) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/user/getVerifications?userName=' + userName
  if (verificationStatus !== null) {
    path = path + '&userVerificationStatus=' + verificationStatus
  }
  let method = 'GET';
  //let hmacInterceptor = headersStore.getState().hmacInterceptorState
  //let request = hmacInterceptor.process(httpRequest.create(url, path, method, null, false));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(handleErrors)
      .then(response =>
        response.json())
      .then(json => {
        console.log(GET_USER_VERIFICATIONS + ' ' + 'OK')
        dispatch({ type: GET_USER_VERIFICATIONS, payload: json });
      })
      .catch(error => {
        console.log('GET_USER_VERIFICATIONS_STATUS' + ' ' + error)
        dispatch({ type: 'GET_USER_VERIFICATIONS_STATUS', payload: error.message });
      });
  };
}

export function getConfigVerificationAction(userName) {
  let url = 'https://service8081.moneyclick.com';
  let path = '/user/getConfig/' + userName + '/verification/OK';
  let method = 'GET';
  let hmacInterceptor = headersStore.getState().hmacInterceptorState
  let request = hmacInterceptor.process(httpRequest.create(url, path, method, null, false));
  return function (dispatch) {
    return fetch(url + path,
      {
        method: method,
        headers: request.headers
      }
    )
      .then(handleErrors)
      .then(response =>
        response.json())
      .then(json => {
        console.log(GET_CONFIG_VERIFICATION + ' ' + 'OK')
        dispatch({ type: GET_CONFIG_VERIFICATION, payload: json });
      })
      .catch(error => {
        console.log('GET_CONFIG_VERIFICATION_STATUS' + ' ' + error)
        dispatch({ type: 'GET_CONFIG_VERIFICATION_STATUS', payload: error.message });
      });
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.status);
  }
  return response;
}