import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  UnauthorizedError,
  UnprocessableEntityError,
} from "../errors/customError";
import { tokenLibrary } from "../lib/token";
import { CustomRequest } from "../types/customRequest";

export const authenticateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  // check authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new BadRequestError("No authorization header provided");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new BadRequestError("No token provided");
  }

  const payload = tokenLibrary.validateToken(token);

  if (!payload) {
    throw new UnprocessableEntityError("Invalid token");
  }

  // attach user info to request object
  req.user = payload;

  next();
};
