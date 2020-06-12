import React, { useCallback } from "react";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import _map from "lodash/map";
import get from "lodash/get";
import property from "lodash/property";
import _filter from "lodash/filter";

import Radio from "./UserLanguagesFieldRadio";

import style from "./UserLanguages.module.scss";
import {
  setUserLanguages,
  setUserLanguagesSkip,
} from "../../../../actions/authorization";
import Spinner from "../../../Spinner";
import options from "../../../../constants/optionsForSelectLanguage";

function UserLanguages() {
  const languages = _filter(
    useSelector(property("quiz.language.languages"), shallowEqual),
    (language) => language.id !== 1000
  );
  const languagesIsLoading = useSelector(
    property("quiz.language.loading"),
    shallowEqual
  );
  const formValue = useSelector(property("form.language.values"), shallowEqual);
  const userId = useSelector(
    property("authorization.userData.id"),
    shallowEqual
  );
  const dispatch = useDispatch();

  const skipButton = useCallback(() => {
    dispatch(setUserLanguagesSkip());
  }, [dispatch]);
  const submitForm = useCallback(
    (event) => {
      event.preventDefault();
      const userLanguages = _map(languages, (language) => {
        return {
          LanguageId: language.id,
          myAssessment: get(formValue, `${language.name}`) || null,
        };
      });
      const answerToServer = {
        UserId: userId,
        userLanguages,
      };
      dispatch(setUserLanguages(answerToServer));
    },
    [formValue, userId, dispatch, languages]
  );

  return (
    <>
      <h1 className={style.selectLanguageText}>
        Please, provide for us your skill level of languages.
      </h1>
      {languagesIsLoading && <Spinner />}
      {!languagesIsLoading && (
        <>
          <form id="languages" className={style.form} onSubmit={submitForm}>
            {_map(languages, (language) => {
              return (
                <Field
                  key={language.id}
                  name={language.name}
                  label={language.name}
                  component={Radio}
                  options={options}
                />
              );
            })}
          </form>
          <div className={style.wrapperButtons}>
            <button
              type="button"
              className={style.buttonSkip}
              onClick={skipButton}
            >
              Skip it. I'm don't want to provide it for now.
            </button>
            <button type="submit" form="languages" className={style.buttonSave}>
              Save
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default reduxForm({
  form: "language",
})(UserLanguages);
