import axios from "axios";
import { getDeviceId } from "../utils/deviceId";
import { serverAddress } from "../config";

const api = axios.create({
  baseURL: serverAddress,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = {
    ...config.headers,
    ...(token && !config.headers?.Authorization
      ? { Authorization: "Bearer ".concat(token) }
      : {}),
    "x-client-id": getDeviceId(),
  };
  return config;
});

export const makeApiRequest = async ({
  endpoint,
  method,
  data,
  headers = {},
}) => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
