import { makeApiRequest } from "../../../api/api";
import { startLoading, stopLoading } from "../loading/loadingAction";
import { toast } from "react-toastify";

import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  SEARCH_DATA,
  FETCH_LESSON_REQUEST,
  FETCH_LESSON_SUCCESS,
  FETCH_LESSON_FAILURE,
  SAVE_LESSON_DATA,
} from "./moduleDataActionTypes";

import {
  convertLessonToArray,
  convertModulesToArray,
} from "../../../utils/utility";

export const searchData = (data) => ({
  type: SEARCH_DATA,
  payload: data,
});

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});
export const fetchLessonRequest = () => ({
  type: FETCH_LESSON_REQUEST,
});
export const fetchLessonSuccess = (data) => ({
  type: FETCH_LESSON_SUCCESS,
  payload: data,
});
export const fetchLessonFailure = (error) => ({
  type: FETCH_LESSON_FAILURE,
  payload: error,
});

export const saveLessonDatas = (data) => ({
  type: SAVE_LESSON_DATA,
  payload: data,
});

export const fetchModuleData = (data) => {
  return async (dispatch) => {
    try {
      dispatch(fetchDataRequest());
      dispatch(searchData(data));
      dispatch(startLoading());
      const response = await makeApiRequest({
        endpoint: "/modules",
        method: "POST",
        data,
      });
      let moduleData = response.data.modules;

      // if (!Array.isArray(moduleData)) {
      //   moduleData = convertModulesToArray(moduleData);
      // }
      dispatch(fetchDataSuccess(moduleData));
      dispatch(stopLoading());
    } catch (error) {
      toast.error("Oops! Just try again.");
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const fetchLessonModuleData = (data) => {
  const { module_name } = data;
  return async (dispatch, getState) => {
    const storeData = getState().persistData.lessonModuleReducer;

    const filteredData = storeData.data[storeData.data.length - 1]?.module_name;
    if (filteredData === module_name) {
      return;
    }

    try {
      dispatch(fetchLessonRequest());
      dispatch(startLoading());
      const response = await makeApiRequest({
        endpoint: "/lessons",
        method: "POST",
        data,
      });

      let lessonData = response.data.lessons
        ? response.data.lessons
        : response.data;
      if (!Array.isArray(lessonData)) {
        lessonData = convertLessonToArray(lessonData);
      }
      lessonData.push({ module_name });
      dispatch(fetchLessonSuccess(lessonData));
      dispatch(stopLoading());
    } catch (error) {
      dispatch(fetchLessonFailure("Oops! Just try again."));
      toast.error("Oops! Just try again.");
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const saveLessonData = (data) => {
  return (dispatch) => {
    try {
      dispatch(saveLessonDatas(data));
    } catch (error) {
      toast.error("Oops! Just try again.");
    }
  };
};
