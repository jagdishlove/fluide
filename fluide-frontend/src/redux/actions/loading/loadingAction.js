import { START_BUTTON_LOADING, START_LOADING, START_SUBMIT_BUTTON_LOADING, STOP_BUTTON_LOADING, STOP_LOADING, STOP_SUBMIT_BUTTON_LOADING } from "./loadingActionTypes";

export const startLoading = () => ({
  type: START_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});

export const startButtonLoading = () => ({
  type: START_BUTTON_LOADING,
});

export const stopButtonLoading = () => ({
  type: STOP_BUTTON_LOADING,
});
export const startSubmitButtonLoading = () => ({
  type: START_SUBMIT_BUTTON_LOADING,
});

export const stopSubmitButtonLoading = () => ({
  type: STOP_SUBMIT_BUTTON_LOADING,
});
