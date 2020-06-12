import React, { memo, useEffect } from "react";
import queryString from "query-string";
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import property from "lodash/property";
import get from "lodash/get";
import { Redirect } from "react-router-dom";

import {
  getUserDataFromGoogleCode,
  getUserDataFromFacebookCode,
} from "../../actions/authorization";
import Spinner from "../Spinner";

function ParseUrlPage({ chosenAuthorizationUrl }) {
  const dispatch = useDispatch();
  const userData = useSelector(
    property("authorization.userData"),
    shallowEqual
  );
  const code = window.location.search;
  const parsedCode = queryString.parse(code);
  console.info("ParseUrlPage!!!", code, parsedCode);
  useEffect(() => {
    if (
      !isEmpty(parsedCode) &&
      isEmpty(userData) &&
      chosenAuthorizationUrl === "google"
    ) {
      dispatch(getUserDataFromGoogleCode(get(parsedCode, "code")));
    }
    if (
      !isEmpty(parsedCode) &&
      isEmpty(userData) &&
      chosenAuthorizationUrl === "facebook"
    ) {
      dispatch(getUserDataFromFacebookCode(get(parsedCode, "code")));
    }
  }, [chosenAuthorizationUrl, dispatch, parsedCode, userData]);
  return isEmpty(userData) ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <Redirect to="/select-language" />
  );
}

export default memo(ParseUrlPage);
