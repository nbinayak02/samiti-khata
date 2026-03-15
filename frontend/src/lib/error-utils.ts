const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error

  if (error instanceof Error) {
    return error.message
  }

  return "An unexpected error occurred. Please try again later."
}

export default getErrorMessage
