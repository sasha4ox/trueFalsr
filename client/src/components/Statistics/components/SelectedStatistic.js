import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import property from "lodash/property";
import _map from "lodash/map";
import _reduce from "lodash/reduce";
import style from "./SelectedStatistic.module.scss";

function SelectedStatistic() {
  const { id } = useParams();
  const currentStatistic = useSelector(
    property(`statistics.data.${id}`),
    shallowEqual
  );
  const allStatisticsAmountValue = _reduce(
    currentStatistic,
    (accumulator, item) => {
      return accumulator + item[`${id}`];
    },
    0
  );
  return (
    <>
      {
        <div className={style.statistic}>
          {_map(currentStatistic, (item, index) => {
            return (
              <div key={index} className={style.statisticItem}>
                {item[`${id}`] && (
                  <>
                    <p className={style.statisticText}>
                      {item.name} <span>{item[`${id}`].toFixed(2)}</span>
                    </p>
                    <ul className={style.wrapperDiagram}>
                      <li
                        className={style.diagram}
                        style={{
                          width:
                            item[`${id}`] / (allStatisticsAmountValue / 100) +
                            "%",
                        }}
                      ></li>
                    </ul>
                  </>
                )}
              </div>
            );
          })}
        </div>
      }
    </>
  );
}

export default memo(SelectedStatistic);
