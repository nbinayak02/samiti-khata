import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/customRequest";
import { UserRole } from "../../generated/prisma/enums";
import { ForbiddenError, UnauthorizedError } from "../errors/customError";

export const authorizeUser = ([...allowedRoles]: UserRole[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      throw new UnauthorizedError("User role not found");
    }

    if (!allowedRoles.includes(userRole)) {
      throw new ForbiddenError("User does not have the permission to access.");
    }

    next();
  };
};
