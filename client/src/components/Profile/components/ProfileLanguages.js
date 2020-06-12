import React, { useCallback, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch, connect, shallowEqual } from "react-redux";
import _map from "lodash/map";
import get from "lodash/get";
import _forEach from "lodash/forEach";
import _filter from "lodash/filter";
import _head from "lodash/head";
import property from "lodash/property";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";

import style from "./ProfileLanguages.module.scss";

import {
  updateUserLanguages,
  getUserLanguages,
  setUserLanguages,
} from "../../../actions/authorization";
import Spinner from "../../Spinner";
import options from "../../../constants/optionsForSelectLanguage";
import { getLanguages } from "../../../actions/quiz";
import Radio from "../../ChooseLanguage/components/UserLanguages/UserLanguagesFieldRadio";

function ProfileLanguages() {
  const languages = _filter(
    useSelector(property("quiz.language.languages")),
    (language) => language.id !== 1000
  );
  const languagesIsLoading = useSelector(
    property("quiz.language.loading"),
    shallowEqual
  );
  const formValue = useSelector(property("form.language.values"), shallowEqual);
  const formValueInitial = useSelector(
    property("form.language.initial"),
    shallowEqual
  );
  const userId = useSelector(
    property("authorization.userData.id"),
    shallowEqual
  );
  const userLanguages = useSelector(
    property("authorization.userData.userLanguages"),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const submitForm = useCallback(
    async (event) => {
      event.preventDefault();
      if (isEmpty(userLanguages)) {
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
      } else {
        if (!isEqual(formValue, formValueInitial)) {
          const setUserLanguages = _map(userLanguages, (language) => {
            return {
              LanguageId: _head(
                _filter(
                  languages,
                  (lang) => lang.name === get(language, "Language.name")
                )
              ).id,
              UserId: userId,
              id: get(language, "id"),
              myAssessment: get(formValue, `${language.Language.name}`),
            };
          });
          const answerToServer = {
            UserId: userId,
            userLanguages: setUserLanguages,
          };
          await dispatch(updateUserLanguages(answerToServer));
          dispatch(getUserLanguages(userId));
        }
      }
    },
    [formValue, userId, dispatch, userLanguages, formValueInitial, languages]
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
              type="submit"
              form="languages"
              className={style.button}
              disabled={isEmpty(formValue)}
            >
              Change
            </button>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  let initialValues = {};
  _forEach(get(state, "authorization.userData.userLanguages"), (language) => {
    initialValues[`${get(language, "Language.name")}`] = get(
      language,
      "myAssessment"
    ).toString();
  });
  return { initialValues };
};

export default connect(mapStateToProps)(
  reduxForm(
    {
      form: "language",
    },
    mapStateToProps
  )(ProfileLanguages)
);
