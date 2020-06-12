import React, { memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import property from "lodash/property";
import _map from "lodash/map";
import _filter from "lodash/filter";
import _isNull from "lodash/isNull";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import {
  selectLanguage,
  getLanguages,
  startQuizAgain,
  showLanguages,
} from "../../actions/quiz";
import Spinner from "../Spinner";
import Header from "../Header/Header";

import style from "./ChooseLanguage.module.scss";
import UserLanguages from "./components/UserLanguages/UserLanguages";

function ChooseLanguage() {
  const MIN_LVL_LANGUAGE_SKILL = 0;
  const ALL_LANGUAGES = "All languages";
  const ANONYMOUS_NAME = "Anonymous";
  const isAnonymous =
    useSelector(property("authorization.userData.name"), shallowEqual) ===
    ANONYMOUS_NAME;
  const dispatch = useDispatch();
  const languages = useSelector(
    property("quiz.language.languages"),
    shallowEqual
  );
  const userLanguages = _filter(
    useSelector(property("authorization.userData.userLanguages"), shallowEqual),
    (language) => language.myAssessment !== MIN_LVL_LANGUAGE_SKILL
  );
  const isShowMyLanguages = useSelector(
    property("quiz.isShowMylanguages"),
    shallowEqual
  );
  const isLanguageLoading = useSelector(
    property("quiz.language.loading"),
    shallowEqual
  );
  const isLanguageSelected = useSelector(
    property("quiz.language.selectedLanguage"),
    shallowEqual
  );
  const isLanguageSet = useSelector(
    property("authorization.isLanguageSet"),
    shallowEqual
  );
  const selectedLanguage = useCallback(
    (event) => {
      const selectedLanguge = _filter(languages, (language) =>
        get(event, "target.name") === ALL_LANGUAGES
          ? true
          : get(event, "target.name").includes(language.name)
      );
      dispatch(selectLanguage(selectedLanguge));
    },
    [dispatch, languages]
  );

  useEffect(() => {
    if (!_isNull(isLanguageSelected)) dispatch(startQuizAgain());
    dispatch(getLanguages());
  }, [dispatch, isLanguageSelected]);

  const handleChange = useCallback(
    (event) => {
      dispatch(showLanguages(event.target.checked));
    },
    [dispatch]
  );

  const checkboxLayout = (
    <form className={style.formLanguagesChange}>
      <label>
        <input type="checkbox" name="showMyLanguages" onChange={handleChange} />
        Show all languages
      </label>
    </form>
  );

  const allLanguagesFromServerLayout = _map(languages, (language) => {
    return (
      <Link
        key={language.id}
        to="/quiz"
        name={language.name}
        onClick={selectedLanguage}
      >
        {language.name}
      </Link>
    );
  });

  const userSelectedLanguagesLayout = (
    <>
      {_map(userLanguages, (language) => {
        return (
          <Link
            key={language.LanguageId}
            to="/quiz"
            name={language.Language.name}
            onClick={selectedLanguage}
          >
            {language.Language.name}
          </Link>
        );
      })}
      <Link
        to="/quiz"
        name={userLanguages.map((language) => language.Language.name).join(" ")}
        onClick={selectedLanguage}
      >
        All My languages
      </Link>
    </>
  );

  return (
    <>
      <Header />
      {(isLanguageSet || isAnonymous) && (
        <>
          <main className={style.choose_main}>
            <h1>Select language for Quiz</h1>
            <div className={style.choose_lang}>
              {!isEmpty(userLanguages) && checkboxLayout}

              {(isShowMyLanguages || isEmpty(userLanguages)) && (
                <>
                  {isLanguageLoading && <Spinner />}
                  {!isLanguageLoading && allLanguagesFromServerLayout}
                </>
              )}

              {!isShowMyLanguages &&
                !isEmpty(userLanguages) &&
                userSelectedLanguagesLayout}
            </div>
          </main>
        </>
      )}
      {!isLanguageSet && !isAnonymous && <UserLanguages />}
    </>
  );
}
export default memo(ChooseLanguage);
