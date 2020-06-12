import React, { memo, useEffect } from "react";
import _map from "lodash/map";
import property from "lodash/property";
import isEmpty from "lodash/isEmpty";
import { NavLink, Switch, Route } from "react-router-dom";
import classnames from "classnames";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import style from "./Statistics.module.scss";

import Header from "../Header/Header";
import { getStatistics } from "../../actions/statistics";
import SelectedStatistic from "./components/SelectedStatistic";

function Statistics() {
  const dispatch = useDispatch();
  const statistics = useSelector(property("statistics.data"), shallowEqual);
  const statisticsMetric = !isEmpty(statistics) && Object.keys(statistics);
  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  return (
    <>
      <Header />
      <ul className={classnames("nav nav-tabs", style.nav)}>
        {_map(statisticsMetric, (item, index) => {
          return (
            <li className="nav-item" key={index}>
              <NavLink
                className="nav-link active"
                activeClassName={style.activeTab}
                to={`/statistic/${item}`}
              >
                {item
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .replace(/([0-9])([A-Z])/g, "$1 $2")
                  .toLowerCase()}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <Switch>
        <Route path="/statistic/:id" component={SelectedStatistic} />
      </Switch>
    </>
  );
}
export default memo(Statistics);
