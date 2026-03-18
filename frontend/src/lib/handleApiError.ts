import type { AxiosError } from "axios"

interface IResponseError {
  error: {
    message: string
  }
}

export const handleApiError = (error: AxiosError) => {

  let errorMessage = "An unexpected error occurred. Please try again later."

  if (error.response) {

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

  return Promise.reject(errorMessage)
}
