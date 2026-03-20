import { Response } from "express";
import { CustomRequest } from "../../types/customRequest";
import BillIssuerService from "./billIssuer.service";
import { BadRequestError } from "../../errors/customError";

const BillIssuerController = {
  handleCreateBillIssuer: async (req: CustomRequest, res: Response) => {
    const organizationId = req.user?.organizationId;

    if (!organizationId) {
      throw new BadRequestError(
        "Organization ID is required to create a bill issuer",
      );
    }
    const billIssuer = await BillIssuerService.create(req.body, organizationId);

    res
      .status(201)
      .json({ message: "Bill issuer created successfully", data: billIssuer });
  },

  handleGetBillIssuersByOrganization: async (
    req: CustomRequest,
    res: Response,
  ) => {
    const organizationId = req.user?.organizationId;

    if (!organizationId) {
      throw new BadRequestError(
        "Organization ID is required to fetch bill issuers",
      );
    }

    const billIssuers =
      await BillIssuerService.getBillIssuersByOrganization(organizationId);

    res
      .status(200)
      .json({
        message: "Bill Issuers fetched successfully!",
        data: billIssuers,
      });
  },
};

export default BillIssuerController;
