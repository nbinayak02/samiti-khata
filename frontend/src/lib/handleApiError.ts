import type { AxiosError } from "axios"
import CustomError from "./customError"

interface IResponseError {
  error: {
    message: string
  }
}

export const handleApiError = (error: AxiosError) => {
  let errorMessage = "An unexpected error occurred. Please try again later."
  const status = error.response?.status

  if (error.response) {
    if (status === 401) {
      errorMessage = "Session expired. Please log in again."
    }

    errorMessage =
      (error.response.data as IResponseError)?.error?.message || errorMessage

    console.log("API Error Response:", error.response)
  } else if (error.request) {
    console.log("API Error Request:", error.request)
    // Request was made but no response received
    errorMessage =
      "No response from server. Please check your network connection."
  } else {
    console.log("API Error Message:", error.message)
    // Something happened in setting up the request
    errorMessage = error.message
  }

  const ErrorObject = new CustomError(errorMessage, status || 500)

  return Promise.reject(ErrorObject)
}
