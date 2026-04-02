import { makeApiRequest } from "../../../api/api";
import { startLoading, stopLoading } from "../loading/loadingAction";
import { toast } from "react-toastify";
import {
  DELETE_PROFILE_FAILURE,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
} from "./deleteProfileActionType";

export const deleteProfileRequest = () => ({
  type: DELETE_PROFILE_REQUEST,
});
export const deleteProfileSuccess = (data) => ({
  type: DELETE_PROFILE_SUCCESS,
  payload: data,
});
export const deleteProfileFailure = (error) => ({
  type: DELETE_PROFILE_FAILURE,
  payload: error,
});

export const deleteProfileData = (data) => {
  return async (dispatch, getState) => {
    const storeData = getState().persistData.loginData.data.token.accessToken;
    const userToken = localStorage.getItem("token");
    const headers = {
      token: userToken,
      common: {
        Authorization: `Bearer ${storeData}`, // Get the token from your storage (e.g., localStorage)
      },
    };
    try {
      dispatch(deleteProfileRequest());
      dispatch(startLoading());
      const response = await makeApiRequest({
        endpoint: "/profile",
        method: "DELETE",
        data,
        headers,
      });
      if (response.status === 200) {
        let res = response.data;
        dispatch(deleteProfileSuccess(res));
        dispatch(stopLoading());
      }
    } catch (error) {
      dispatch(deleteProfileFailure(error));
      toast.error(error?.message || "Oops! Just try again.");
    } finally {
      dispatch(stopLoading());
    }
  };
};
