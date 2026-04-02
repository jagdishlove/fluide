
import { CLOSE_DELETE__MODAL, CLOSE_PASSWORD_MODAL, CLOSE_SAVE__MODAL, OPEN_DELETE_MODAL, OPEN_PASSWORD_MODAL, OPEN_SAVE_MODAL } from "./modalActionTypes";

export const openSaveModal = () => ({
  type: OPEN_SAVE_MODAL,
});
export const openDeleteModal = () => ({
  type: OPEN_DELETE_MODAL,
});
export const openPasswordModal = () => ({
  type: OPEN_PASSWORD_MODAL,
});

export const closeSaveModal = () => ({
  type: CLOSE_SAVE__MODAL,
});
export const closeDeleteModal = () => ({
  type: CLOSE_DELETE__MODAL,
});
export const closePasswordModal = () => ({
  type: CLOSE_PASSWORD_MODAL,
});
