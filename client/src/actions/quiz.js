import {
  SELECT_LANGUAGE_FOR_QUIZ,
  END_QUIZ,
  START_QUIZ_AGAIN,
  NEXT_QUESTION,
  GET_QUIZ_QUESTIONS_START,
  GET_QUIZ_QUESTIONS_SUCCESS,
  GET_QUIZ_QUESTIONS_FAILURE,
  CREATE_QUIZ_QUESTIONS_SUCCESS,
  CREATE_QUIZ_QUESTIONS_FAILURE,
  CREATE_QUIZ_QUESTIONS_START,
  GET_LANGUAGES_START,
  GET_LANGUAGES_FAILURE,
  GET_LANGUAGES_SUCCESS,
  ANSWER_QUIZ_START,
  ANSWER_QUIZ_FAILURE,
  ANSWER_QUIZ_SUCCESS,
  GET_QUIZ_RESULT_START,
  GET_QUIZ_RESULT_FAILURE,
  GET_QUIZ_RESULT_SUCCESS,
  SCREEN_ORIENTATION,
  COUNTDOWN_TIMER_START,
  COUNTDOWN_TIMER_TICK,
  SHOW_HEADER_IN_QUIZ,
  SHOW_MY_LANGUAGES,
  SHOW_ALL_LANGUAGES,
} from "../constants/index";

import _head from "lodash/head";

import fetchAsync from "../utils/fetch";
import { apiUrl } from "../client-config";

const MIN_ID_SIZE = 1;

export function isShowingHeaderInQuiz(isShowHeader) {
  return {
    type: SHOW_HEADER_IN_QUIZ,
    isShowHeader,
  };
}

export function countdownTimerStart(secondsToEnd) {
  return {
    type: COUNTDOWN_TIMER_START,
    secondsToEnd,
  };
}
export function countdownTimerTick() {
  return {
    type: COUNTDOWN_TIMER_TICK,
  };
}

export function screenOrientation(isNeedToRotate) {
  return {
    type: SCREEN_ORIENTATION,
    payload: isNeedToRotate,
  };
}

export function selectLanguage(language) {
  return {
    type: SELECT_LANGUAGE_FOR_QUIZ,
    language,
  };
}
export function getLanguagesStart() {
  return {
    type: GET_LANGUAGES_START,
  };
}
export function getLanguagesFailure(data) {
  return {
    type: GET_LANGUAGES_FAILURE,
    payload: data,
  };
}
export function getLanguagesSuccess(data) {
  return {
    type: GET_LANGUAGES_SUCCESS,
    payload: data,
  };
}
export function getLanguages() {
  return async (dispatch) => {
    try {
      dispatch(getLanguagesStart());
      const payload = await fetchAsync(`${apiUrl}/language/list`);
      if (payload.status === "error") {
        return dispatch(getLanguagesFailure(payload.message));
      }
      return dispatch(getLanguagesSuccess(payload.data));
    } catch (error) {
      return dispatch(getLanguagesFailure(error.message));
    }
  };
}
export function getQuestionsStart() {
  return {
    type: GET_QUIZ_QUESTIONS_START,
  };
}
export function getQuestionsSuccess(data) {
  return {
    type: GET_QUIZ_QUESTIONS_SUCCESS,
    payload: data,
  };
}
export function getQuestionsFailure(data) {
  return {
    type: GET_QUIZ_QUESTIONS_FAILURE,
    payload: data,
  };
}
export function createTestStat() {
  return {
    type: CREATE_QUIZ_QUESTIONS_START,
  };
}
export function createTestSuccess(data) {
  return {
    type: CREATE_QUIZ_QUESTIONS_SUCCESS,
    payload: data,
  };
}
export function createTestFailure(data) {
  return {
    type: CREATE_QUIZ_QUESTIONS_FAILURE,
    payload: data,
  };
}
export function getQuestions(LanguageIds, excludedquestions) {
  return async (dispatch) => {
    dispatch(getQuestionsStart());
    const languageId = LanguageIds.length > MIN_ID_SIZE ? [1000] : LanguageIds;
    try {
      const payload = await fetchAsync(
        `${apiUrl}/questions/?id=${_head(languageId)}&excludedquestions=${
          excludedquestions ? excludedquestions : 0
        }&userlanguages=${LanguageIds.join()}`
      );
      if (payload.status === "error") {
        return dispatch(getQuestionsFailure(payload.message));
      }
      return dispatch(getQuestionsSuccess(payload.data));
    } catch (error) {
      return dispatch(getQuestionsFailure(error.message));
    }
  };
}
export function createTest(UserId, LanguageIds) {
  return async (dispatch) => {
    dispatch(createTestStat());
    try {
      const payload = await fetchAsync(`${apiUrl}/test`, "POST", {
        UserId,
        LanguageId: _head(LanguageIds),
      });
      if (payload.status === "error") {
        return dispatch(createTestFailure(payload.message));
      }
      dispatch(createTestSuccess(payload.data));
      dispatch(countdownTimerStart(60));
      return dispatch(getQuestions(LanguageIds));
    } catch (error) {
      return dispatch(createTestFailure(error.message));
    }
  };
}
export function startQuizAgain() {
  return {
    type: START_QUIZ_AGAIN,
  };
}
export function endQuiz() {
  return {
    type: END_QUIZ,
  };
}
export function nextQuestion(currentQuestion) {
  return {
    type: NEXT_QUESTION,
    currentQuestion,
  };
}

// ANSWER
export function answerStart() {
  return {
    type: ANSWER_QUIZ_START,
  };
}
export function answerFailure() {
  return {
    type: ANSWER_QUIZ_FAILURE,
  };
}
export function answerSuccess() {
  return {
    type: ANSWER_QUIZ_SUCCESS,
  };
}

export function answer(answerData) {
  return async (dispatch) => {
    try {
      dispatch(answerStart());
      const payload = await fetchAsync(`${apiUrl}/answer`, "POST", answerData);
      if (payload.status === "error") {
        return dispatch(endQuiz());
      }
    } catch (error) {
      return dispatch(endQuiz());
    }
  };
}

export function getQuizResultStart() {
  return {
    type: GET_QUIZ_RESULT_START,
  };
}

export function getQuizResultFailure(data) {
  return {
    type: GET_QUIZ_RESULT_FAILURE,
    payload: data,
  };
}

export function getQuizResultSuccess(data) {
  return {
    type: GET_QUIZ_RESULT_SUCCESS,
    payload: data,
  };
}

export function getResult(testId) {
  return async (dispatch) => {
    try {
      dispatch(getQuizResultStart());
      const payload = await fetchAsync(`${apiUrl}/test/result/${testId}`);
      if (payload.status === "error") {
        return dispatch(getQuizResultFailure(payload.message));
      }
      return dispatch(getQuizResultSuccess(payload.data));
    } catch (error) {
      return dispatch(getQuizResultFailure(error.message));
    }
  };
}

export function showLanguages(isMyLanguage) {
  const showMyLanguages = {
    type: SHOW_MY_LANGUAGES,
  };
  const showAllLanguages = {
    type: SHOW_ALL_LANGUAGES,
  };
  return isMyLanguage ? showMyLanguages : showAllLanguages;
}
