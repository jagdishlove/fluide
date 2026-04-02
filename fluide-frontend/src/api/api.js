import axios from "axios";

const api = axios.create({
  // baseURL: "https://www.fluide.ai/api",
  // baseURL: "http://localhost:5000",
  baseURL: "http://localhost:8080",
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
