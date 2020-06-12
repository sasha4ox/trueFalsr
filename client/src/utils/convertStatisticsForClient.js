import _map from "lodash/map";
import _forEach from "lodash/forEach";

export default function convertStatisticsForClient(statistics, ...keys) {
  let object = {};
  _forEach(keys, (key) => {
    object[`${key}`] = _map(statistics, (item) => {
      return {
        name: item.name,
        [`${key}`]: item[`${key}`],
      };
    });
  });
  return object;
}
