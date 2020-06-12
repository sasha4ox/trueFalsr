import React, { useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import property from "lodash/property";

import CustomFieldLogin from "./components/CustomFieldLogin/CustomFieldLogin";
import LoginRegistrationButton from "./components/LoginRegistrationButton/LoginRegistrationButton";
import {
  login,
  alertCreator,
  // withoutRegistration,
  registration,
} from "../../../../actions/authorization";
import Alert from "./components/Alert/Alert";
import AuthorizationWith from "../AuthorizationWith";
import classnames from "classnames";

// import Footer from "../../../Footer/Footer";

import style from "./Login.module.scss";

const validate = (value) => {
  const errors = {};
  // const minLengthPassword = 5;
  if (!value.login) {
    errors.login = "Required";
  }
  // else if (value.email.length < minLengthPassword) {
  //   errors.email = `Bro, not enough characters for a valid email`;
  // } else if (!value.email.match(/^[\d.a-z-]+@[\da-z-]{2,}.[a-z]{2,}$/i)) {
  //   errors.email = 'Please, check your email, it looks invalid ';
  // }
  if (!value.password) {
    errors.password = "Required";
  }
  // else if (value.password.length < minLengthPassword) {
  //   errors.password = `Password must have at least 5 characters, you typed only ${value.password.length}`;
  // }

  return errors;
};

function Login({ googleUrl, facebookUrl }) {
  const formLoginState = useSelector(property("form.Login"), shallowEqual);
  const formLoginValue = useSelector(
    property("form.Login.values"),
    shallowEqual
  );
  const loginState = useSelector(property("authorization"), shallowEqual);
  const dispatch = useDispatch();
  const loginHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (formLoginState.syncErrors) {
        return dispatch(alertCreator("All fields have to be filled.", "error"));
      }

      return dispatch(login(formLoginValue));
    },
    [dispatch, formLoginValue, formLoginState]
  );
  const anonymousPass = useCallback(() => {
    const randomValue = Math.round(Math.random() * 100000000);
    const anonymousUserData = {
      name: "Anonymous",
      login: `Anonymous-${randomValue}`,
      password: `Anonymous-${randomValue}`,
    };
    dispatch(registration(anonymousUserData));
  }, [dispatch]);
  return (
    <div className={style.containerLogin}>
      {loginState.alert && (
        <Alert message={loginState.alert} view={loginState.view} />
      )}
      <h1 className={style.textLogin}>Code Readability Quiz</h1>
      <div className={style.formContainerLogin}>
        <div className={style.withoutRegistration}>
          <button
            className={classnames(style.btn, style.btnLight)}
            onClick={anonymousPass}
          >
            Without registration
          </button>
        </div>
        <form className={style.loginForm} onSubmit={loginHandler}>
          <Field
            component={CustomFieldLogin}
            label="Email "
            // name="email"
            name="login"
            type="text"
          />
          <Field
            component={CustomFieldLogin}
            label="Password"
            name="password"
            type="password"
          />
          <div className={style.wrapperForButton}>
            <LoginRegistrationButton name="login" />
            <div className={style.wrapperForLink}>
              <Link className={style.link} to="/registration">
                Don&apos;t have an account? Click for create.
              </Link>
              {/* <Link className={s.link} to="/password_reset"> */
              /*  Forgot your password? */
              /* </Link> */}
            </div>
          </div>
        </form>
        <AuthorizationWith googleUrl={googleUrl} facebookUrl={facebookUrl} />
      </div>
      {/*<Footer />*/}
    </div>
  );
}

Login.whyDidYouRender = true;
export default reduxForm({
  form: "Login",
  validate,
})(Login);
