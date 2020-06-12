import React, { useCallback } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import property from "lodash/property";
import get from "lodash/get";

import CustomFieldRegistration from "./components/CustomFieldRegistration/CustomFieldRegistration";
import { alertCreator, registration } from "../../../../actions/authorization";
import Alert from "../login/components/Alert/Alert";
import LoginRegistrationButton from "../login/components/LoginRegistrationButton/LoginRegistrationButton";
import AuthorizationWith from "../AuthorizationWith";
// import Footer from "../../../Footer/Footer";

import style from "./Registration.module.scss";

const validate = (value) => {
  const errors = {};
  // const minLengthPassword = 5;
  // const minLengthName = 1;
  if (!value.login) {
    errors.login = "Required";
  }
  // else if (value.email.length < minLengthPassword) {
  //   errors.email = `Bro, not enough characters for a valid email`;
  // } else if (!value.email.match(/^[\d.a-z-]+@[\da-z-]{2,}.[a-z]{2,}$/i)) {
  //   errors.email = 'Please, check your email, it looks invalid ';
  // }
  if (!value.name) {
    errors.name = "Required";
  }
  // else if (value.userName.length <= minLengthName) {
  //   errors.userName = `Bro, not enough characters for a name`;
  // }

  if (!value.password) {
    errors.password = "Required";
  }
  // else if (value.password.length < minLengthPassword) {
  //   errors.password = `Password must have at least 5 characters, you typed only ${value.password.length}`;
  // }

  return errors;
};
function Registration({ googleUrl, facebookUrl }) {
  const dispatch = useDispatch();
  const registrationForm = useSelector(
    property("form.Registration"),
    shallowEqual
  );
  const loginState = useSelector(property("authorization"), shallowEqual);
  const registrationHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (registrationForm.syncErrors) {
        console.info(registrationForm.syncErrors);
        return dispatch(alertCreator("All fields have to be filled.", "error"));
      }

      return dispatch(registration(get(registrationForm, "values")));
    },
    [dispatch, registrationForm]
  );
  return (
    <div className={style.containerRegistration}>
      {loginState.alert && (
        <Alert message={loginState.alert} view={loginState.view} />
      )}
      <h1 className={style.textRegistration}>
        Please register to get test result
      </h1>
      <div className={style.formContainerRegistration}>
        <form className={style.RegistrationForm} onSubmit={registrationHandler}>
          <Field
            component={CustomFieldRegistration}
            label="Name"
            name="name"
            type="text"
          />
          <Field
            component={CustomFieldRegistration}
            label="Email"
            name="login"
            type="text"
          />
          <Field
            component={CustomFieldRegistration}
            label="Password"
            name="password"
            type="password"
          />
          <div className={style.wrapperForButton}>
            <LoginRegistrationButton name="Registration" />
            <div className={style.wrapperForLink}>
              <Link className="link" to="/login">
                Have an account? Click for Log in.
              </Link>
            </div>
          </div>
        </form>
        <AuthorizationWith googleUrl={googleUrl} facebookUrl={facebookUrl} />
      </div>
      {/*<Footer />*/}
    </div>
  );
}

Registration.whyDidYouRender = true;
export default reduxForm({
  form: "Registration",
  validate,
})(Registration);
