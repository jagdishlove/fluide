import { makeApiRequest } from "../../../api/api";
import {
  startButtonLoading,
  startLoading,
  startSubmitButtonLoading,
  stopButtonLoading,
  stopLoading,
  stopSubmitButtonLoading,
} from "../loading/loadingAction";
import { toast } from "react-toastify";
import { getCached, setCached, hashText } from "../../../utils/aiCacheService";
import {
  FETCH_QUIZ_ANSWER_REQUEST,
  FETCH_QUIZ_FAILURE,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ__ANSWER_FAILURE,
  FETCH_QUIZ__ANSWER_SUCCESS,
  REMOVE_QUIZ_ANSWERS,
  REMOVE_QUIZ_QUESTIONS,
} from "./quizActionTypes";

export const fetchQuizRequest = () => ({
  type: FETCH_QUIZ_REQUEST,
});
export const fetchQuizSuccess = (data) => ({
  type: FETCH_QUIZ_SUCCESS,
  payload: data,
});
export const fetchQuizFailure = (error) => ({
  type: FETCH_QUIZ_FAILURE,
  payload: error,
});
export const fetchQuizAnswerRequest = () => ({
  type: FETCH_QUIZ_ANSWER_REQUEST,
});
export const fetchQuizAnswerSuccess = (data) => ({
  type: FETCH_QUIZ__ANSWER_SUCCESS,
  payload: data,
});
export const fetchQuizAnswerFailure = (error) => ({
  type: FETCH_QUIZ__ANSWER_FAILURE,
  payload: error,
});
export const removeQuizData = () => ({
  type: REMOVE_QUIZ_QUESTIONS,
});
export const removeQuizAnswers = () => ({
  type: REMOVE_QUIZ_ANSWERS,
});

export const fetchQuizData = (descriptionText) => {
  return async (dispatch, getState) => {
    const data =
      typeof descriptionText === "string" && descriptionText.trim()
        ? descriptionText
        : JSON.parse(localStorage.getItem("description") || '""');

    if (!data || !data.trim()) {
      toast.error("Please wait for the content to be fully generated.");
      return;
    }

    const searchData = getState().persistData.moduleData.searchData;
    const ctx = {
      topic: searchData.topic,
      module: hashText(data),
      level: searchData.level,
      language: searchData.language,
    };
    const cached = getCached("quiz", ctx);
    if (cached) {
      dispatch(removeQuizData());
      dispatch(fetchQuizSuccess(cached));
      return;
    }
    const payload = {
      description: data,
      language: searchData.language,
      level: searchData.level,
    };
    try {
      dispatch(removeQuizData());
      dispatch(startButtonLoading());
      const response = await makeApiRequest({
        endpoint: "/quiz",
        method: "POST",
        data: payload,
      });

      dispatch(fetchQuizSuccess(response.data));
      setCached("quiz", ctx, response.data);
      dispatch(stopButtonLoading());
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Oops! Just try again.");
      } else {
        toast.error("Oops! Just try again.");
      }
    } finally {
      dispatch(stopButtonLoading());
    }
  };
};
export const fetchQuizAnswerData = (data) => {
  return async (dispatch, getState) => {
    const searchData = getState().persistData.moduleData.searchData;
    data.language = searchData.language;
    try {
      dispatch(fetchQuizAnswerRequest());
      dispatch(removeQuizAnswers());
      dispatch(startSubmitButtonLoading());
      const response = await makeApiRequest({
        endpoint: "/quiz-answer",
        method: "POST",
        data,
      });

      dispatch(fetchQuizAnswerSuccess(response.data));
      dispatch(stopSubmitButtonLoading());
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Oops! Just try again.");
      } else {
        toast.error("Oops! Just try again.");
      }
    } finally {
      dispatch(stopSubmitButtonLoading());
    }
  };
};
