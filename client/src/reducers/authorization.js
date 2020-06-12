import {
  ALERT_SHOW,
  ALERT_HIDE,
  LOGIN_START,
  LOGIN_FAILURE,
  REGISTRATION_START,
  REGISTRATION_FAILURE,
  GET_GOOGLE_URL,
  AUTHORIZATION_SUCCESS,
  // WITHOUT_REGISTRATION,
  GET_FACEBOOK_URL,
  CHOSEN_AUTHORIZATION_URL,
  SET_USER_LANGUAGES_START,
  SET_USER_LANGUAGES_FAILURE,
  SET_USER_LANGUAGES_SUCCESS,
  SET_USER_LANGUAGES_SKIP,
  UPDATE_USER_LANGUAGES_START,
  UPDATE_USER_LANGUAGES_FAILURE,
  UPDATE_USER_LANGUAGES_SUCCESS,
  GET_USER_LANGUAGES_START,
  GET_USER_LANGUAGES_FAILURE,
  GET_USER_LANGUAGES_SUCCESS,
  LOG_OUT,
} from "../constants";
import get from "lodash/get";

const initialState = {
  isLanguageSet: false,
  setUserLanguageIsLoading: false,
};

export default function authorization(state = initialState, action) {
  switch (action.type) {
    // case WITHOUT_REGISTRATION:
    //   return {
    //     ...state,
    //     userData: action.data,
    //     isLanguageSet: true,
    //   };
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        ...action.data,
        isLoggedIn: false,
      };
    case REGISTRATION_START:
      return {
        ...state,
        loading: true,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        ...action.data,
      };
    case CHOSEN_AUTHORIZATION_URL:
      return {
        ...state,
        chosenAuthorizationUrl: action.chosenAuthorizationUrl,
      };
    case GET_GOOGLE_URL:
      return {
        ...state,
        googleUrl: action.url,
      };
    case GET_FACEBOOK_URL:
      return {
        ...state,
        facebookUrl: action.url,
      };
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        userData: action.data,
        googleUrl: null,
        isLanguageSet: get(action, "isLanguageSet", true),
      };
    case ALERT_HIDE:
      return {
        ...state,
        alert: null,
      };
    case ALERT_SHOW:
      return {
        ...state,
        alert: action.text,
        view: action.view,
      };
    case SET_USER_LANGUAGES_START:
      return {
        ...state,
        setUserLanguageIsLoading: true,
      };
    case SET_USER_LANGUAGES_FAILURE:
      return {
        ...state,
        setUserLanguageIsLoading: false,
        setUserLanguageError: action.message,
      };
    case SET_USER_LANGUAGES_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          userLanguages: [...action.payload],
        },
        isLanguageSet: true,
        setUserLanguageIsLoading: false,
      };
    case SET_USER_LANGUAGES_SKIP:
      return {
        ...state,
        isLanguageSet: true,
      };
    case UPDATE_USER_LANGUAGES_START:
      return {
        ...state,
        updateUserLanguagesIsLoading: true,
      };
    case UPDATE_USER_LANGUAGES_FAILURE:
      return {
        ...state,
        updateUserLanguagesIsLoading: false,
        updateUserLanguageError: action.message,
      };
    case UPDATE_USER_LANGUAGES_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          userLanguages: [...action.payload],
        },
        updateUserLanguagesIsLoading: false,
      };
    case GET_USER_LANGUAGES_START:
      return {
        ...state,
        getUserLanguagesIsLoading: true,
      };
    case GET_USER_LANGUAGES_FAILURE:
      return {
        ...state,
        getUserLanguagesIsLoading: false,
        getUserLanguageError: action.message,
      };
    case GET_USER_LANGUAGES_SUCCESS:
      return {
        ...state,
        getUserLanguagesIsLoading: false,
        userData: {
          ...state.userData,
          userLanguages: [...action.payload],
        },
      };
    case LOG_OUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
