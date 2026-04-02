import {  CLOSE_DELETE__MODAL, CLOSE_PASSWORD_MODAL, CLOSE_SAVE__MODAL, OPEN_DELETE_MODAL,  OPEN_PASSWORD_MODAL, OPEN_SAVE_MODAL } from "../actions/modalAction/modalActionTypes";

  const initialState = {
    saveModal: false,
    deleteModal: false,
    passwordModal: false,
  };
  
  const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case OPEN_SAVE_MODAL:
        return { ...state, saveModal: true };
      case OPEN_DELETE_MODAL:
        return { ...state, deleteModal: true };
      case OPEN_PASSWORD_MODAL:
        return { ...state, passwordModal: true };
      case CLOSE_SAVE__MODAL:
        return { ...state, saveModal: false };
      case CLOSE_DELETE__MODAL:
        return { ...state, deleteModal: false };
      case CLOSE_PASSWORD_MODAL:
        return { ...state, passwordModal: false };
     
      default:
        return state;
    }
  };
  
  export default modalReducer;
  