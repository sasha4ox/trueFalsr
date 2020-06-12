import React, { memo, useCallback, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import property from "lodash/property";
import _map from "lodash/map";
import _toLower from "lodash/toLower";
import get from "lodash/get";
import isArray from "lodash/isArray";
import classnames from "classnames";

import style from "./Questions.module.scss";

import splitCode from "../../../../utils/splitCode";
import generateUniqueKey from "../../../../utils/generateUniqueKey";
import { nextQuestion, answer, getQuestions } from "../../../../actions/quiz";

function Questions() {
  const isQuizStarted = useSelector(property("quiz.isQuizStarted"));
  const MIN_QUESTIONS_IN_STATE = 1;

  useEffect(() => {
    //for first getting question
    dispatch(nextQuestion());
  }, []);

  const dispatch = useDispatch();
  const UserId = useSelector(
    property("authorization.userData.id"),
    shallowEqual
  );
  const testInfo = useSelector(property("quiz.test"), shallowEqual);
  const questions = useSelector(
    property("quiz.allQuestions.questions"),
    shallowEqual
  );
  const answeredQuestions = useSelector(
    property("quiz.allQuestions.answered"),
    shallowEqual
  );
  const selectedLanguage = _map(
    useSelector(property("quiz.language.selectedLanguage"), shallowEqual),
    (language) => language.id
  );
  const currentQuestion = useSelector(
    property("quiz.allQuestions.currentQuestion[0]"),
    shallowEqual
  );
  const currentQuestionText = useSelector(
    property("quiz.allQuestions.currentQuestion[0].text"),
    shallowEqual
  );
  const convertedStrings = splitCode(currentQuestionText);
  const currentQuestionLanguage = _toLower(
    useSelector(
      property("quiz.allQuestions.currentQuestion[0].Language.name"),
      shallowEqual
    )
  );

  const next = useCallback(
    (event) => {
      const targetName = get(event, "target.name");
      const targetArrowCode = get(event, "code");
      const userAnswer =
        targetName === "true" || targetArrowCode === "ArrowRight";
      const TestId = get(testInfo, "id");
      const LanguageId = get(currentQuestion, "LanguageId");
      const QuestionId = get(currentQuestion, "id");
      const rightAnswer = get(currentQuestion, "result");

      const answerToServer = {
        TestId,
        UserId,
        LanguageId,
        QuestionId,
        answer: rightAnswer,
        userAnswer,
      };

      if (questions.length === MIN_QUESTIONS_IN_STATE) {
        // get more questions
        const answeredQuestionsId = _map(
          answeredQuestions,
          (answer) => answer.id
        );
        const questionsInStateId = _map(questions, (question) => question.id);
        const excludeQuestionsId = [
          ...answeredQuestionsId,
          ...questionsInStateId,
          QuestionId,
        ].join();

        dispatch(getQuestions(selectedLanguage, excludeQuestionsId));
      }
      dispatch(answer(answerToServer));
      dispatch(nextQuestion(currentQuestion));
    },
    [
      dispatch,
      currentQuestion,
      questions,
      testInfo,
      selectedLanguage,
      answeredQuestions,
      UserId,
    ]
  );

  //arrow answer
  const keyDown = (event) => {
    if (event.code === "ArrowRight") return next(event);
    if (event.code === "ArrowLeft") return next(event);
  };
  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  });

  return (
    <div
      className={classnames({
        [style.wrapper_questions]: isQuizStarted,
        [style.wrapper_questions_before_start]: !isQuizStarted,
      })}
    >
      <div className={style.wrapper_question}>
        <div className={style.question}>
          {_map(convertedStrings, (itemCode, index) => {
            if (isArray(itemCode.code)) {
              return (
                <div
                  key={generateUniqueKey(index)}
                  className={classnames({
                    [style.string_start]: itemCode.isStartSeparated === true,
                    [style.string_finish]: itemCode.isStartSeparated === false,
                    [style.divededOnOneline]: itemCode.isBetweenStartFinish,
                  })}
                >
                  {_map(itemCode.code, (item, index) => {
                    return (
                      <SyntaxHighlighter
                        key={generateUniqueKey(index)}
                        language={currentQuestionLanguage}
                        style={docco}
                      >
                        {item}
                      </SyntaxHighlighter>
                    );
                  })}
                </div>
              );
            } else {
              return (
                <div
                  className={itemCode.marked && style.marked_string}
                  key={generateUniqueKey(index)}
                >
                  <SyntaxHighlighter
                    language={currentQuestionLanguage}
                    style={docco}
                  >
                    {itemCode.code}
                  </SyntaxHighlighter>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={style.wrapper_for_Button}>
        <button
          name="false"
          type="button"
          className={classnames(style.button, style.button_false)}
          onClick={next}
          disabled={!isQuizStarted}
        >
          False
        </button>
        <button
          name="true"
          type="button"
          className={classnames(style.button, style.button_true)}
          onClick={next}
          disabled={!isQuizStarted}
        >
          True
        </button>
      </div>
    </div>
  );
}
export default memo(Questions);
