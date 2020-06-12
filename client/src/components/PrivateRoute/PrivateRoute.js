import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import property from "lodash/property";
import isEmpty from "lodash/isEmpty";
import { Route, Redirect } from "react-router-dom";

function redirectComponent() {
  return <Redirect to="/" />;
}

function PrivateRoute({ component, ...options }) {
  const userData = useSelector(
    property("authorization.userData"),
    shallowEqual
  );

  const componentToRender = !isEmpty(userData) ? component : redirectComponent;
  return <Route {...options} component={componentToRender} />;
}

export default PrivateRoute;
