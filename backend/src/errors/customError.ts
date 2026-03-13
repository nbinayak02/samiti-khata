import AppError from "./appError";

class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}

class ValidationError extends AppError {
  constructor(message: string, errors: any) {
    super(message, 422, errors);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

class UnknownError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export {
  BadRequestError,
  UnprocessableEntityError,
  ValidationError,
  UnauthorizedError,
  UnknownError,
  ForbiddenError,
  NotFoundError,
};
