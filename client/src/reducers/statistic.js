import { FETCH_STATISTIC_DATA_SUCCESS } from '../constants';

export default function statistic(state = {}, action) {
    switch (action.type) {
        case FETCH_STATISTIC_DATA_SUCCESS:
            return {
                ...state,
                allLanguagesAnswersStatistic: action.allLanguagesAnswersStatistic,
            };
        default:
            return state;
    }
}