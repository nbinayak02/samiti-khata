import axios, { AxiosError } from "axios";
import {
  ApiErrorResponse,
  RetryableAxiosRequestConfig,
  RetryFailedRequestQueue,
} from "../types";
import handleApiError from "../error/handleApiError";
import processQueue from "./retry-queue";

const retryFailedRequestQueue: RetryFailedRequestQueue[] = [];

let isRefreshing = false;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v2";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    const response = error.response;
    const serverError = response?.data;

    const isExpiredToken =
      response?.status === 401 &&
      serverError?.errorCode === "ERR_TOKEN_EXPIRED";

    // if error is not about token expiry
    if (!isExpiredToken) {
      return Promise.reject(handleApiError(error));
    }

    // If the req is already retried then prevent infinite loop
    if (originalRequest._retry) {
      return Promise.reject(handleApiError(error));
    }

    // set as retried
    originalRequest._retry = true;

    // Another refresh request already running then push it to queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        retryFailedRequestQueue.push({
          resolve,
          reject,
          config: originalRequest,
        });
      });
    }

    // if not then start refreshing
    isRefreshing = true;

    try {
      // refresh
      await refreshInstance.post("/auth/refresh");

      // process failed requests after refresh
      processQueue(retryFailedRequestQueue);

      return axiosInstance.request(originalRequest);
    } catch (refreshError) {
      processQueue(retryFailedRequestQueue, refreshError);
      return Promise.reject(handleApiError(refreshError));
    } finally {
      isRefreshing = false;
    }
  },
);
