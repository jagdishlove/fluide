import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_FAILURE,
  GOOGLE_LOGIN_SUCCESS,
} from "./LoginActionType";
import { makeApiRequest } from "../../../api/api";
import { startLoading, stopLoading } from "../loading/loadingAction";
import { toast } from "react-toastify";
import axios from "axios";
import { serverAddress } from "../../../config";

export const login = () => ({
  type: LOGIN_REQUEST,
});
export const googleLogin = () => ({
  type: GOOGLE_LOGIN_REQUEST,
});
export const googleLoginSuccess = (data) => ({
  type: GOOGLE_LOGIN_SUCCESS,
  payload: data,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});
export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch(login());
      dispatch(startLoading());

      const response = await makeApiRequest({
        endpoint: "/login",
        method: "POST",
        data,
      });
      dispatch(loginSuccess(response.data));
      dispatch(stopLoading());
      return response;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Oops! Just try again.");
      } else {
        toast.error("Email or password is wrong.");
      }
      dispatch(loginError(error.message));
      dispatch(stopLoading());
      throw error;
    }
  };
};
export const googleLoginAction = () => {
  return async (dispatch) => {
    window.open(`${serverAddress}/auth/google/`, "_self");
  };
};

export const googleLoginRedirectAction = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const url = `${serverAddress}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      localStorage.setItem("token", data.user.token.accessToken);
      dispatch(googleLoginSuccess(data.user));
    } catch (error) {
      toast.error("Oops! Just try again.");
    } finally {
      dispatch(stopLoading());
    }
  };
  // try {
  //   dispatch(login());
  //   dispatch(startLoading());
  //   const header = {
  //     withCredentials: true,

  //   };

  //   const response = await makeApiRequest({
  //     endpoint: "/auth/login/success",
  //     method: "GET",
  //     header,
  //   });

  //   dispatch(googleLoginSuccess(response.data));
  //   window.location.href = "/";
  //   dispatch(stopLoading());
  //   return response;
  // } catch (error) {
  //   if (error.code === "ERR_NETWORK") {
  //     toast.error("Oops! Just try again.");
  //   } else {
  //     toast.error("Oops! Just try again.");
  //   }
  //   dispatch(loginError(error.message));
  //   dispatch(stopLoading());
  //   throw error;
  // }
};
