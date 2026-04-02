import { CLEAN_DATA } from "../actions/cleanUpData/cleanUpDataActionTypes";
import {
  FETCH_LESSON_SUCCESS,
  FETCH_LESSON_FAILURE,
  FETCH_LESSON_REQUEST,
  SAVE_LESSON_DATA,
} from "../actions/modulesData/moduleDataActionTypes";

const initialState = {
  data: [],
  lessonData: [],
};

const lessonModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LESSON_REQUEST:
      return { ...state };
    case FETCH_LESSON_SUCCESS:
      return { ...state, data: action.payload };
    case SAVE_LESSON_DATA:
      return { ...state, lessonData: action.payload };
    case FETCH_LESSON_FAILURE:
      return { ...state };
      case CLEAN_DATA:
        return { ...state, data: [],lessonData: []};

    default:
      return state;
  }
};

export default lessonModuleReducer;
