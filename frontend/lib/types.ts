import { InternalAxiosRequestConfig } from "axios";

export interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface RetryFailedRequestQueue {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: RetryableAxiosRequestConfig;
}
