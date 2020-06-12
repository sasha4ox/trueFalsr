import nodeFetch from 'node-fetch';

import { apiUrl } from '../client-config';
import {
    FETCH_DATA_START,
    FETCH_DATA_FAILURE, FETCH_STATISTIC_DATA_SUCCESS
} from '../constants';

function fetchDataStart() {
    return {
        type: FETCH_DATA_START,
    };
}
function fetchDataFailure(data) {
    return {
        type: FETCH_DATA_FAILURE,
        payload: data,
    };
}

function getStatisticOfAllLanguagesAnswers(data) {
    return {
        type: FETCH_STATISTIC_DATA_SUCCESS,
        allLanguagesAnswersStatistic: data,
    }
}

export function getAllLanguagesStatistic() {
    return async dispatch => {
        dispatch(fetchDataStart());
        try {
            const response = await nodeFetch(`${apiUrl}/statistic/languages`, {
                method: 'get'
            });
            const data = await response.json();
            console.info('Statistic data!!!', data);
            return dispatch(getStatisticOfAllLanguagesAnswers(data.data));

        } catch (error) {
            return dispatch(fetchDataFailure(error));
        }
    }
}