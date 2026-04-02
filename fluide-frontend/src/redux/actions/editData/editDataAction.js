import { makeApiRequest } from "../../../api/api";
import { startLoading, stopLoading } from "../loading/loadingAction";
import { toast } from "react-toastify";
import { FETCH_PROFILE_SUCCESS } from "./editDataActionTypes";
import { openSaveModal } from "../modalAction/modalAction";

export const fetchProfileData = (data) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: data,
});

export const editProfileData = (data) => {
  return async (dispatch) => {
    const userToken = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    try {
      dispatch(startLoading());
      const response = await makeApiRequest({
        endpoint: "/profile",
        method: "PUT",
        data,
        headers,
      });
      const fetchDataResponse = await makeApiRequest({
        endpoint: "/profile",
        method: "GET",
        data,
        headers,
      });
      if (response.status === 200) {
        let res = fetchDataResponse.data;
        dispatch(fetchProfileData(res));
        dispatch(openSaveModal());
        dispatch(stopLoading());
      }
    } catch (error) {
      toast.error("Oops! Just try again.");
    } finally {
      dispatch(stopLoading());
    }
  };
};
