import {
  STATISTICS_GET_START,
  STATISTICS_GET_FAILURE,
  STATISTICS_GET_SUCCESS,
} from "../constants";

const initialState = {
  isLoading: false,
  error: null,
};

export default function statistics(state = initialState, action) {
  switch (action.type) {
    case STATISTICS_GET_START:
      return {
        ...state,
        isLoading: true,
      };
    case STATISTICS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case STATISTICS_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    default:
      return state;
  }
}
