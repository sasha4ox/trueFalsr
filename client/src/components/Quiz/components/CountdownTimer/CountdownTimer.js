import React, { memo } from "react";
import Circle from "react-circle";
import { useSelector, shallowEqual } from "react-redux";
import property from "lodash/property";

import style from "./CountdownTimer.module.scss";

function CountdownTimer() {
  const startSeconds = 60;
  const oneHundredPercent = 100;
  const twentyFivePercent = 25;
  const secondsToEndQuiz =
    useSelector(property("quiz.timer.secondsToEnd"), shallowEqual) ||
    startSeconds;
  const percentage = Math.floor(
    secondsToEndQuiz / (startSeconds / oneHundredPercent)
  );
  const currentQuestionLanguage = useSelector(
    property("quiz.allQuestions.currentQuestion[0].Language.name")
  );

  return (
    <div className={style.wrapper_timer}>
      <div className={style.question_language}> {currentQuestionLanguage}</div>
      <p className={style.timer_seconds}>{secondsToEndQuiz}</p>
      <Circle
        animate={true}
        animationDuration="1s"
        responsive={true}
        size={150}
        lineWidth={30}
        progress={percentage}
        progressColor={
          percentage > twentyFivePercent ? "cornflowerblue" : "red"
        }
        bgColor="whitesmoke"
        showPercentage={false}
        showPercentageSymbol={false}
      />
    </div>
  );
}

export default memo(CountdownTimer);
