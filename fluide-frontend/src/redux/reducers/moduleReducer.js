import { CLEAN_DATA } from "../actions/cleanUpData/cleanUpDataActionTypes";
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  SEARCH_DATA,
} from "../actions/modulesData/moduleDataActionTypes";

const initialState = {
  data: [],
  searchData: [],
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
    case CLEAN_DATA:
      return { ...state, data: []};
    default:
      return state;
  }
};

export default moduleReducer;
