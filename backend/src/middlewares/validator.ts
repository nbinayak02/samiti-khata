import z from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError, ValidationError } from "../errors/customError";

const validator = (schema: z.ZodSchema<any>) => {
  //return a middleware
  return (req: Request, res: Response, next: NextFunction) => {
    // extract body from request
    const body = req.body;

    if (!body) {
      throw new BadRequestError("Request body is required");
    }

    // validate the body against the schema
    const result = schema.safeParse(body);

    if (!result.success) {
      // collect the errors
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      // throw a validation error with the collected errors
      throw new ValidationError("Validation failed", errors);
    } else {
      // if success, pass to next middleware
      next();
    }
  };
};

export default validator;