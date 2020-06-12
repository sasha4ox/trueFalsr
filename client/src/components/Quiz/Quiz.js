import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import property from "lodash/property";
import throttle from "lodash/throttle";
import _map from "lodash/map";

import Questions from "./components/Questions/Questions";
import {
  endQuiz,
  createTest,
  screenOrientation,
  countdownTimerTick,
  isShowingHeaderInQuiz,
} from "../../actions/quiz";
import CountdownTimer from "./components/CountdownTimer/CountdownTimer";
import Header from "../Header/Header";

import style from "./Quiz.module.scss";

let interval;

function Quiz() {
  const isQuizFinished = useSelector(
    property("quiz.isQuizFinished"),
    shallowEqual
  );
  const isQuizStarted = useSelector(
    property("quiz.isQuizStarted"),
    shallowEqual
  );
  const userId = useSelector(
    property("authorization.userData.id"),
    shallowEqual
  );
  const languageIds = _map(
    useSelector(property("quiz.language.selectedLanguage"), shallowEqual),
    (language) => language.id
  );
  const isNeedToRotate = useSelector(
    property("quiz.isNeedToRotate"),
    shallowEqual
  );
  const secondsToEndQuiz = useSelector(
    property("quiz.timer.secondsToEnd"),
    shallowEqual
  );
  const isTimerStart = useSelector(
    property("quiz.timer.isTimerStart"),
    shallowEqual
  );
  const isShowHeader = useSelector(property("quiz.isShowHeader"), shallowEqual);
  const dispatch = useDispatch();

  const secondsWhenQuizEnd = 0;
  // countdown timer    ---- START
  useEffect(() => {
    if (isTimerStart) {
      interval = setInterval(() => {
        dispatch(countdownTimerTick());
      }, 1000);
    }
  }, [isTimerStart, dispatch]);

  useEffect(() => {
    if (secondsToEndQuiz === secondsWhenQuizEnd) {
      dispatch(endQuiz());
    }
  }, [secondsToEndQuiz, dispatch]);
  useEffect(() => {
    checkWidth();
    return () => {
      clearInterval(interval);
    };
  }, []);
  // countdown timer    ---- END

  const startGame = useCallback(() => {
    dispatch(createTest(userId, languageIds));
  }, [dispatch, userId, languageIds]);

  const checkWidth = () => {
    const orientation = window.matchMedia("(orientation: portrait)");
    const maxWidth665px = window.matchMedia("(max-width: 665px)");
    const maxHeight = window.matchMedia("(max-height: 450px)");
    if (orientation.matches && maxWidth665px.matches) {
      dispatch(screenOrientation(true));
    } else {
      dispatch(screenOrientation(false));
    }
    if (maxHeight.matches) {
      dispatch(isShowingHeaderInQuiz(false));
    } else {
      dispatch(isShowingHeaderInQuiz(true));
    }
  };
  useEffect(() => {
    window.addEventListener("resize", throttle(checkWidth, 500));
    return () => {
      window.removeEventListener("resize", throttle(checkWidth, 500));
    };
  });

  return (
    <>
      {isShowHeader && <Header />}
      <div className="quiz">
        {isQuizFinished && <Redirect to="result" />}
        {isQuizStarted && (
          <div>
            <CountdownTimer />
          </div>
        )}
        {isQuizStarted ? (
          <Questions />
        ) : (
          <div className={style.wrapper_before_start}>
            <div className={style.wrapper_start_quiz}>
              <button
                type="button"
                className={style.start_button}
                onClick={startGame}
                // disabled={isNeedToRotate}
              >
                START QUIZ
              </button>
              {isNeedToRotate && (
                <p>
                  Please rotate the screen to horizontal for a more comfortable
                  game
                </p>
              )}
            </div>
            <Questions />
          </div>
        )}
      </div>
    </>
  );
}
export default memo(Quiz);
