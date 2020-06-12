import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import property from "lodash/property";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import { getAllLanguagesStatistic } from "./actions/statistic";
import Authorization from "./components/Authorization";
import ParseUrlPage from "./components/ParseUrlPage";

import ChooseLanguage from "./components/ChooseLanguage/ChooseLanguage";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";
import Statistics from "./components/Statistics/Statistics";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "./App.scss";
import { toggleMenu } from "./actions/mobile";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector(property("authorization.userData"));
  const allLanguagesStatistic = useSelector(
    property("statistic.allLanguagesAnswersStatistic")
  );

  useEffect(() => {
    if (isEmpty(allLanguagesStatistic)) {
      dispatch(getAllLanguagesStatistic());
    }
  }, [allLanguagesStatistic, dispatch]);

  useEffect(() => {
    dispatch(toggleMenu(false));
  }, [location]);
  return (
    <div className="app">
      <Switch>
        <Route path="/callback/google">
          <ParseUrlPage chosenAuthorizationUrl="google" />
        </Route>
        <Route path="/callback/facebook">
          <ParseUrlPage chosenAuthorizationUrl="facebook" />
        </Route>
        <Route path={["/login", "/registration"]} component={Authorization} />
        <PrivateRoute
          exact
          path="/select-language"
          component={ChooseLanguage}
        />
        <PrivateRoute path="/quiz" component={Quiz} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/result" component={Result} />
        <Route path="/statistic" component={Statistics}></Route>

        <Route
          path="/"
          render={() =>
            !isEmpty(userData) ? (
              <Redirect to="/select-language" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </div>
  );
}

export default memo(App);
