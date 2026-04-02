import {
  FETCH_QUIZ_ANSWER_REQUEST,
  FETCH_QUIZ_FAILURE,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ__ANSWER_FAILURE,
  FETCH_QUIZ__ANSWER_SUCCESS,
  REMOVE_QUIZ_ANSWERS,
  REMOVE_QUIZ_QUESTIONS,
} from "../actions/quizData/quizActionTypes";

const initialState = {
  quizData: [],
  quizAnswer: [],
};

const quizDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZ_REQUEST:
      return { ...state };
    case FETCH_QUIZ_SUCCESS:
      return { ...state, quizData: action.payload };
    case FETCH_QUIZ_FAILURE:
      return { ...state };
    case FETCH_QUIZ_ANSWER_REQUEST:
      return { ...state };
    case FETCH_QUIZ__ANSWER_SUCCESS:
      return { ...state, quizAnswer: action.payload };
    case FETCH_QUIZ__ANSWER_FAILURE:
      return { ...state };
    case REMOVE_QUIZ_QUESTIONS:
      return { ...state, quizData: [], quizAnswer: [] };
    case REMOVE_QUIZ_ANSWERS:
      return { ...state, quizAnswer: [] };

    default:
      return state;
  }
};

export default quizDataReducer;
