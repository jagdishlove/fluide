import { makeApiRequest } from "../../../api/api";
import { startLoading, stopLoading } from "../loading/loadingAction";
import { toast } from "react-toastify";
import {
  FETCH_PASSWORD_REQUEST,
  FETCH_PASSWORD_FAILURE,
  FETCH_PASSWORD_SUCCESS,
} from "./passwordActionType";
import { closePasswordModal } from "../modalAction/modalAction";
export const fetchPasswordRequest = () => ({
  type: FETCH_PASSWORD_REQUEST,
});
export const fetchPasswordSuccess = (data) => ({
  type: FETCH_PASSWORD_SUCCESS,
  payload: data,
});
export const fetchPasswordFailure = (error) => ({
  type: FETCH_PASSWORD_FAILURE,
  payload: error,
});

// export const savePasswordData = (data) => ({
//   type: SAVE_PASSWORD_DATA,
//   payload: data,
// });

export const fetchPasswordData = (data, navigate) => {
  return async (dispatch, getState) => {
    const userToken = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    try {
      dispatch(startLoading());
      const response = await makeApiRequest({
        endpoint: "/change-password",
        method: "POST",
        data,
        headers,
      });
      if (response.status === 200) {
        let res = response.data;
        dispatch(fetchPasswordSuccess(res));
        dispatch(closePasswordModal());
        dispatch(stopLoading());
        navigate("/");
      }
    } catch (error) {
      dispatch(fetchPasswordFailure(error));
      toast.error(error?.message || "Oops! Just try again.");
    } finally {
      dispatch(stopLoading());
    }
  };
};
