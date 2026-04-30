import { Response } from "express";
import { CustomRequest } from "../../types/customRequest";
import BillIssuerService from "./authorizedOrgMember.service";
import { BadRequestError } from "../../errors/customError";

const AuthorizedOrgMemberController = {
  handleCreate: async (req: CustomRequest, res: Response) => {
    const organizationId = req.user?.organizationId;

    if (!organizationId) {
      throw new BadRequestError(
        "Organization ID is required to create authorized organization member",
      );
    }
    const billIssuer = await BillIssuerService.create(req.body, organizationId);

    res
      .status(201)
      .json({
        message: "Authorized organization member created successfully",
        data: billIssuer,
      });
  },

  handleGetByOrganization: async (req: CustomRequest, res: Response) => {
    const organizationId = req.user?.organizationId;

    if (!organizationId) {
      throw new BadRequestError(
        "Organization ID is required to fetch authorized organization members",
      );
    }

    const billIssuers =
      await BillIssuerService.getByOrganization(organizationId);

    res.status(200).json({
      message: "Authorized organization members fetched successfully!",
      data: billIssuers,
    });
  },
};

export default AuthorizedOrgMemberController;
