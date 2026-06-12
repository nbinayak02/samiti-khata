import axios from "axios";

type ApiResponse = {
  success: boolean;
  message: string;
  data?: object | [];
  errorCode?: string;
  error?: object;
};

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:3000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response is: ", response);
    return response;
  },
  async (error) => {
    console.log("Error is: ", { error });
    const backendError = error.response.data;
    if (
      error.response &&
      error.response.status === 401 &&
      backendError.errorCode === "TOKEN_EXPIRED"
    ) {
      console.log("Token expired");
    }
  },
);
