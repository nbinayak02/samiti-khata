import { Request, Response } from "express";
import UserService from "./user.service";
import { CustomRequest } from "../../types/customRequest";
import { BadRequestError } from "../../errors/customError";

const UserController = {
  handleGetAllAdmins: async (req: Request, res: Response) => {
    const admins = await UserService.getAllAdmins();

    res
      .status(200)
      .json({ message: "Admins retrieved successfully", data: admins });
  },

  handleGetAllOperators: async (req: CustomRequest, res: Response) => {
    const organizationId = req.user?.organizationId;
    if (!organizationId) {
      throw new BadRequestError(
        "Organization ID is required to fetch operators",
      );
    }

    const operators = await UserService.getAllOperators(organizationId);

    res
      .status(200)
      .json({ message: "Operators retrieved successfully", data: operators });
  },

  handleApproveAdmin: async (req: Request, res: Response) => {
    await UserService.approveAdmin(req.body);
    res.status(200).json({ message: "Admin approved successfully" });
  },

  handleApproveOperator: async (req: CustomRequest, res: Response) => {
    const operatorId = Number(req.params.operatorId);
    const organizationId = req.user?.organizationId;

    if (!organizationId || !operatorId) {
      throw new BadRequestError(
        "Organization ID and Operator ID is required to approve operator",
      );
    }
    await UserService.approveOperator(operatorId, organizationId);
    res.status(200).json({ message: "Operator approved successfully" });
  },
};

export default UserController;
