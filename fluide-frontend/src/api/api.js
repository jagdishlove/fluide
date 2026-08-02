import axios from "axios";
import { getDeviceId } from "../utils/deviceId";

const api = axios.create({
  // baseURL: "https://www.fluide.ai/api",
  // baseURL: "http://localhost:5000",
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
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
