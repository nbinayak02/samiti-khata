import CustomError from "./customError";

export function getErrorMessage(error: unknown): string {
  if (error instanceof CustomError || error instanceof Error) {
    return error.message;
  } else {
    return "Something went wrong.";
  }
}
