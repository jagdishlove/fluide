import { makeApiRequest } from "../../../api/api";
import { startLoading, stopLoading } from "../loading/loadingAction";
import { toast } from "react-toastify";
import {
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
} from "./forgetPasswordTypes";

export const forgetPasswordRequest = (data) => ({
  type: FORGET_PASSWORD_REQUEST,
  payload: data,
});
export const forgetPasswordSuccess = (data) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: data,
});
export const forgetPasswordFail = (data) => ({
  type: FORGET_PASSWORD_FAIL,
  payload: data,
});

export const forgetPasswordAction = (payload) => {
  return async (dispatch) => {
    const data = { email: payload };
    try {
      dispatch(startLoading());
      const response = await makeApiRequest({
        endpoint: "/reset-password",
        method: "POST",
        data,
      });
      toast.success(
        "We’ve sent you an email to reset your password. Please check your inbox and spam folder!",
        { autoClose: 5000 },
      );
    } catch (error) {
      toast.error(error.message || "Oops! Just try again.");
      dispatch(stopLoading());
    } finally {
      dispatch(stopLoading());
    }
  };
};
