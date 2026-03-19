import { Request, Response } from "express";
import { CustomRequest } from "../../types/customRequest";
import UserService from "./user.service";
import { BadRequestError } from "../../errors/customError";

const UserController = {
  handleGetAllAdmins: (req: Request, res: Response) => {
    const admins = UserService.getAllAdmins();
    res
      .status(200)
      .json({ message: "Admins retrieved successfully", data: admins });
  },

  handleGetAllOperators: (req: CustomRequest, res: Response) => {
    const organizationId = req.user?.organizationId;
    if (!organizationId) {
      throw new BadRequestError(
        "Organization ID is required to fetch operators",
      );
    }

    const operators = UserService.getAllOperators(organizationId);
    res
      .status(200)
      .json({ message: "Operators retrieved successfully", data: operators });
  },
};

export default UserController;
