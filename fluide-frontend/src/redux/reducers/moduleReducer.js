import { CLEAN_DATA } from "../actions/cleanUpData/cleanUpDataActionTypes";
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  SEARCH_DATA,
  SET_USAGE_STATUS,
} from "../actions/modulesData/moduleDataActionTypes";

const initialState = {
  data: [],
  searchData: [],
  usage: {
    count: 0,
    limit: 3,
    remaining: 3,
    blocked: false,
    message: "",
  },
};

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DATA:
      return { ...state, searchData: action.payload };
    case FETCH_DATA_REQUEST:
      return { ...state, data: null };
    case FETCH_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case FETCH_DATA_FAILURE:
      return { ...state, data: null };
    case SET_USAGE_STATUS: {
      const limit = action.payload?.limit ?? initialState.usage.limit;
      const count = action.payload?.count ?? initialState.usage.count;
      const remaining = Math.max(0, limit - count);
      return {
        ...state,
        usage: {
          count,
          limit,
          remaining,
          blocked: remaining <= 0,
          message: action.payload?.message ?? initialState.usage.message,
        },
      };
    }
    case CLEAN_DATA:
      return { ...state, data: []};
    default:
      return state;
  }
};

export default moduleReducer;
