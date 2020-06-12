import React, { memo, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import property from "lodash/property";
import get from "lodash/get";

import { getResult, startQuizAgain } from "../../actions/quiz";

import style from "./Result.module.scss";
import Header from "../Header/Header";

function Result() {
  const dispatch = useDispatch();
  const testId = useSelector(property("quiz.test.id"), shallowEqual);
  const testResult = useSelector(property("quiz.result"), shallowEqual);

  useEffect(() => {
    dispatch(getResult(testId));
  }, [testId, dispatch]);

  const tryTestAgain = useCallback(() => {
    dispatch(startQuizAgain());
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className={style.result_wrapper}>
        <h1>Your result :</h1>
        <p className={style.result_questions}>
          Questions: {get(testResult, "totalAnswersInTest")}
        </p>
        <p className={style.result_questions_rigth}>
          Rigth answers: {get(testResult, "correctAnswersInTest")}
        </p>
        <NavLink to="/select-language" onClick={tryTestAgain}>
          try agian
        </NavLink>
      </div>
    </>
  );
}
export default memo(Result);
