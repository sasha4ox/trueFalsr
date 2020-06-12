import nodeFetch from "node-fetch";
import get from "lodash/get";
import history from "../history";

import { apiUrl } from "../client-config";
import {
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
  ALERT_SHOW,
  ALERT_HIDE,
  LOGIN_START,
  LOGIN_FAILURE,
  REGISTRATION_START,
  REGISTRATION_FAILURE,
  AUTHORIZATION_SUCCESS,
  GET_GOOGLE_URL,
  // WITHOUT_REGISTRATION,
  GET_FACEBOOK_URL,
  CHOSEN_AUTHORIZATION_URL,
  SET_USER_LANGUAGES_START,
  SET_USER_LANGUAGES_FAILURE,
  SET_USER_LANGUAGES_SUCCESS,
  SET_USER_LANGUAGES_SKIP,
  UPDATE_USER_LANGUAGES_START,
  UPDATE_USER_LANGUAGES_SUCCESS,
  UPDATE_USER_LANGUAGES_FAILURE,
  GET_USER_LANGUAGES_START,
  GET_USER_LANGUAGES_FAILURE,
  GET_USER_LANGUAGES_SUCCESS,
  LOG_OUT,
} from "../constants";

import fetchAsync from "../utils/fetch";

let timeOut;
const millisecondsToAlertDisappear = 3000;

export function alertShow(text, view) {
  return {
    type: ALERT_SHOW,
    text,
    view,
  };
}
export function alertHide() {
  return {
    type: ALERT_HIDE,
  };
}

export function loginStart() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailure(data) {
  return {
    type: LOGIN_FAILURE,
    data,
  };
}

export function loginSuccess(data) {
  history.push("/");
  return {
    type: AUTHORIZATION_SUCCESS,
    data: get(data, "data"),
  };
}

function fetchDataStart() {
  return {
    type: FETCH_DATA_START,
  };
}
function fetchDataFailure(data) {
  return {
    type: FETCH_DATA_FAILURE,
    payload: data,
  };
}

export function registrationStart() {
  return {
    type: REGISTRATION_START,
  };
}
export function registrationSuccess(data) {
  // history.push('/login');
  return {
    type: AUTHORIZATION_SUCCESS,
    data: get(data, "data"),
    isLanguageSet: false,
  };
}

export function registrationFailure(data) {
  return {
    type: REGISTRATION_FAILURE,
    data,
  };
}

export function registration(registrationValue) {
  return async (dispatch) => {
    dispatch(registrationStart());
    try {
      const payload = await fetch(`${apiUrl}/user/signup`, {
        method: "post",
        body: JSON.stringify(registrationValue),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await payload.json();
      if (payload.status === "error") {
        dispatch(alertCreator(data.message, data.status));
        return dispatch(registrationFailure(payload));
      }
      dispatch(alertCreator(data.message, data.status));
      return dispatch(registrationSuccess(data));
    } catch (error) {
      dispatch(alertCreator(error.message, "error"));
      return dispatch(registrationFailure(error));
    }
  };
}

export function chosenAuthorizationUrl(url) {
  return {
    type: CHOSEN_AUTHORIZATION_URL,
    chosenAuthorizationUrl: url,
  };
}

function getGoogleUrl(data) {
  // history.push(`${data}`);
  return {
    type: GET_GOOGLE_URL,
    url: data,
  };
}

function getFacebookUrl(data) {
  // history.push(`${data}`);
  return {
    type: GET_FACEBOOK_URL,
    url: data,
  };
}

function getUserData(data, isRegistration) {
  history.push("/");
  //  history.replace('/main');
  return {
    type: AUTHORIZATION_SUCCESS,
    data: data,
    isLanguageSet: !isRegistration,
  };
}

export function alertCreator(text, view) {
  return (dispatch) => {
    dispatch(alertShow(text, view));
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      dispatch(alertHide());
    }, millisecondsToAlertDisappear);
  };
}

export function login(loginValue) {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await fetch(`${apiUrl}/user/signin`, {
        method: "post",
        body: JSON.stringify(loginValue),
        // credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === "error") {
        dispatch(alertCreator(response.message, response.status));
        return dispatch(loginFailure(response));
      }
      dispatch(alertCreator(data.message, data.status));
      return dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(alertCreator(error.message, "error"));
      return dispatch(loginFailure(error));
    }
  };
}

export function getGoogleAuthorizationUrl() {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    try {
      const response = await nodeFetch(`${apiUrl}/user/google`, {
        method: "get",
      });
      const data = await response.json();
      return dispatch(getGoogleUrl(data.data));
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}

export function getUserDataFromGoogleCode(code) {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    try {
      const response = await nodeFetch(
        `${apiUrl}/user/google/code?code=${code}`,
        {
          method: "get",
        }
      );
      const data = await response.json();
      return dispatch(
        getUserData(
          get(data, "data.userData"),
          get(data, "data.isRegistration")
        )
      );
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}

// export function withoutRegistration() {
//   const anonymousUser = {
//     id: 1000,
//     name: "Anonymous",
//   };
//   return {
//     type: WITHOUT_REGISTRATION,
//     data: anonymousUser,
//   };
// }

export function getFacebookAuthorizationUrl() {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    try {
      const response = await nodeFetch(`${apiUrl}/user/facebook`, {
        method: "get",
      });
      const data = await response.json();
      return dispatch(getFacebookUrl(data.data));
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}

export function getUserDataFromFacebookCode(code) {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    try {
      const response = await nodeFetch(
        `${apiUrl}/user/facebook/code?code=${code}`,
        {
          method: "get",
        }
      );
      const data = await response.json();
      return dispatch(
        getUserData(
          get(data, "data.userData"),
          get(data, "data.isRegistration")
        )
      );
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}

export function setUserLanguagesStart() {
  return {
    type: SET_USER_LANGUAGES_START,
  };
}
export function setUserLanguagesFailure(message) {
  return {
    type: SET_USER_LANGUAGES_FAILURE,
    message,
  };
}
export function setUserLanguagesSuccess(payload) {
  return {
    type: SET_USER_LANGUAGES_SUCCESS,
    payload,
  };
}
export function setUserLanguagesSkip() {
  return {
    type: SET_USER_LANGUAGES_SKIP,
  };
}
export function setUserLanguages(userSetLanguages) {
  return async (dispatch) => {
    try {
      setUserLanguagesStart();
      const payload = await fetchAsync(
        `${apiUrl}/user/languages`,
        "POST",
        userSetLanguages
      );
      if (payload.status === "error") {
        return dispatch(setUserLanguagesFailure(payload.message));
      }
      return dispatch(setUserLanguagesSuccess(payload.data));
    } catch (error) {
      return dispatch(setUserLanguagesFailure(error.message));
    }
  };
}

export function updateUserLanguagesStart() {
  return {
    type: UPDATE_USER_LANGUAGES_START,
  };
}

export function updateUserLanguagesFailure(message) {
  return {
    type: UPDATE_USER_LANGUAGES_FAILURE,
    message,
  };
}

export function updateUserLanguagesSuccess(payload) {
  return {
    type: UPDATE_USER_LANGUAGES_SUCCESS,
    payload,
  };
}

export function updateUserLanguages(userUpdatedLanguages) {
  return async (dispatch) => {
    try {
      dispatch(updateUserLanguagesStart());
      const payload = await fetchAsync(
        `${apiUrl}/user/languages-update`,
        "PATCH",
        userUpdatedLanguages
      );
      if (payload.status === "error") {
        return dispatch(updateUserLanguagesFailure(payload.message));
      }
      return dispatch(updateUserLanguagesSuccess(payload.data));
    } catch (error) {
      return dispatch(updateUserLanguagesFailure(error.message));
    }
  };
}

export function getUserLanguagesStart() {
  return {
    type: GET_USER_LANGUAGES_START,
  };
}

export function getUserLanguagesFailure(message) {
  return {
    type: GET_USER_LANGUAGES_FAILURE,
    message,
  };
}

export function getUserLanguagesSuccess(payload) {
  return {
    type: GET_USER_LANGUAGES_SUCCESS,
    payload,
  };
}

export function getUserLanguages(userId) {
  return async (dispatch) => {
    try {
      dispatch(getUserLanguagesStart());
      const payload = await fetchAsync(`${apiUrl}/user/languages/${userId}`);
      if (payload.status === "error") {
        return dispatch(getUserLanguagesFailure(payload.message));
      }
      return dispatch(getUserLanguagesSuccess(payload.data));
    } catch (error) {
      return dispatch(getUserLanguagesFailure(error.message));
    }
  };
}

export function LogOut() {
  return {
    type: LOG_OUT,
  };
}
