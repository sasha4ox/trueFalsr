import {
  STATISTICS_GET_SUCCESS,
  STATISTICS_GET_START,
  STATISTICS_GET_FAILURE,
} from "../constants";

import fetchAsync from "../utils/fetch";
import { apiUrl } from "../client-config";
import convertStatisticsForClient from "../utils/convertStatisticsForClient";

export function getStatisticsStart() {
  return {
    type: STATISTICS_GET_START,
  };
}
export function getStatisticsFailure(payload) {
  return {
    type: STATISTICS_GET_FAILURE,
    payload,
  };
}

export function getStatisticsSuccess(payload) {
  return {
    type: STATISTICS_GET_SUCCESS,
    payload,
  };
}

export function getStatistics() {
  return async (dispatch) => {
    dispatch(getStatisticsStart);
    try {
      const payload = await fetchAsync(`${apiUrl}/statistic/tags/all`);
      if (payload.status === "error") {
        return dispatch(getStatisticsFailure(payload.message));
      }
      let convertedStatistic = convertStatisticsForClient(
        payload.data,
        "averageTimeOfCorrectAnswers",
        "averageTimeOfIncorrectAnswers",
        "correctAnswers",
        "percentile95OfCorrect",
        "percentile95OfIncorrect",
        "totalAnswers"
      );

      console.log(convertedStatistic);
      return dispatch(getStatisticsSuccess(convertedStatistic));
    } catch (error) {
      return dispatch(getStatisticsFailure(error.message));
    }
  };
}
