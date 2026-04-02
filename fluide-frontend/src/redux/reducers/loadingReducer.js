import {
  START_BUTTON_LOADING,
  START_LOADING,
  START_SUBMIT_BUTTON_LOADING,
  STOP_BUTTON_LOADING,
  STOP_LOADING,
  STOP_SUBMIT_BUTTON_LOADING,
} from "../actions/loading/loadingActionTypes";

const initialState = {
  isLoading: false,
  isButtonLoading:false,
  isSubmitButtonLoading:false
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case START_BUTTON_LOADING:
      return { ...state, isButtonLoading: true };
    case STOP_BUTTON_LOADING:
      return { ...state, isButtonLoading: false };
    case START_SUBMIT_BUTTON_LOADING:
      return { ...state, isSubmitButtonLoading: true };
    case STOP_SUBMIT_BUTTON_LOADING:
      return { ...state, isSubmitButtonLoading: false };
    default:
      return state;
  }
};

export default loadingReducer;
