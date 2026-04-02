import { SHOW_TOAST, HIDE_TOAST } from "../actions/toast/toastActionTypes";

const initialState = {
  message: "",
  isOpen: false,
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        message: action.payload.message,
        isOpen: true,
      };
    case HIDE_TOAST:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default toastReducer;
