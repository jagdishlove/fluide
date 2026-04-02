import { SHOW_TOAST, HIDE_TOAST } from "./toastActionTypes";

export const showToast = (message) => ({
  type: SHOW_TOAST,
  payload: { message },
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});
