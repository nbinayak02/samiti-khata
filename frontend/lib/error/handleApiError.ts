import { AxiosError } from "axios";
import CustomError from "./customError";
import { ApiErrorResponse } from "../types";

export default function handleApiError(
  error: AxiosError<ApiErrorResponse> | unknown,
): CustomError {
  if (error instanceof AxiosError) {
    let errorMessage = "An unexpected error occurred. Please try again later.";

    const status = error.response?.status ?? 500;

    if (error.response) {
      if (status === 401) {
        errorMessage = "Session expired. Please log in again.";
      }

      errorMessage = error.response.data?.message ?? errorMessage;
    } else if (error.request) {
      errorMessage =
        "No response from server. Please check your network connection.";
    } else {
      errorMessage = error.message;
    }

    return new CustomError(errorMessage, status);
  } else {
    return new CustomError("Something went wrong", 500);
  }
}
