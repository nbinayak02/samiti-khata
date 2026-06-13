import { RetryFailedRequestQueue } from "../types";
import { axiosInstance } from "./browser.client";

export default function processQueue(
  retryFailedRequestQueue: RetryFailedRequestQueue[],
  error?: unknown,
) {
  while (retryFailedRequestQueue.length) {
    const { resolve, reject, config } = retryFailedRequestQueue.shift()!;

    if (error) {
      reject(error);
      continue;
    }

    axiosInstance.request(config).then(resolve).catch(reject);
  }
}
