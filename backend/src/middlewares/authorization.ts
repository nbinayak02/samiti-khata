import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/customRequest";
import { ForbiddenError, UnauthorizedError } from "../errors/customError";
import { UserRole } from "../../generated/prisma/client";

export const authorizeUser = ([...allowedRoles]: UserRole[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    // console.log("User role: ", userRole);

    if (!userRole) {
      throw new UnauthorizedError("User role not found");
    }

    if (!allowedRoles.includes(userRole)) {
      throw new ForbiddenError("You do not have the permission to access.");
    }

    next();
  };
};
