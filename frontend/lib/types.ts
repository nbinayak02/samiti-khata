import { InternalAxiosRequestConfig } from "axios";

export interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface RetryFailedRequestQueue {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: RetryableAxiosRequestConfig;
}

export type ApiErrorResponse = {
  message: string;
  success: boolean;
  error: object;
  errorCode: string;
};