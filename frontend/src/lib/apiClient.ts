import axios, { AxiosError, type AxiosRequestConfig } from "axios"
import { handleApiError } from "./handleApiError"
import { toast } from "sonner"

interface RetryFailedRequestQueue {
  resolve: (value?: unknown) => void
  reject: (reason?: any) => void
  config: AxiosRequestConfig
}

// Queue to hold failed requests while token is being refreshed
const retryFailedRequestQueue: RetryFailedRequestQueue[] = []

// Flag to indicate if token refresh is in progress
let isRefreshing = false

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,

  // Handle 401 errors by attempting to refresh the token
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401) {
      // refresh the token
      if (!isRefreshing) {
        isRefreshing = true
        // console.log("Refreshing token...")
        try {
          // refresh the token
          const response = await refreshInstance.post("/auth/refresh")
          const { token } = response.data
          if (!token) throw new Error("No token returned from refresh endpoint")
          localStorage.setItem("token", token)

          // Update the original request with the new token and retry it
          error.config.headers.Authorization = `Bearer ${token}`

          // Process the queued requests
          retryFailedRequestQueue.forEach(({ config, reject, resolve }) => {
            config.headers!.Authorization = `Bearer ${token}`
            axiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((error) => reject(handleApiError(error)))
          })

          // Clear the queue and reset the refreshing flag
          retryFailedRequestQueue.length = 0
          return axiosInstance(originalRequest)
        } catch (error: AxiosError | any) {
          console.error("Token refresh failed:", error)
          localStorage.removeItem("token")
          localStorage.removeItem("userInfo")
          return handleApiError(error)
        } finally {
          isRefreshing = false
        }
      }

      // while token is being refreshed, queue the failed request
      return new Promise((resolve, reject) => {
        retryFailedRequestQueue.push({
          resolve,
          reject,
          config: originalRequest,
        })
      })
    } else {
      return handleApiError(error)
    }
  }
)

export default axiosInstance
