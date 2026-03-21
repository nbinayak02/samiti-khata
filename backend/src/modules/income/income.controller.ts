import { Response } from "express";
import { CustomRequest } from "../../types/customRequest";
import IncomeService from "./income.service";
import { BadRequestError } from "../../errors/customError";

const IncomeController = {
  handleCreateIncome: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new BadRequestError("User Id is not found");
    const income = await IncomeService.create(req.body, userId);
    res
      .status(201)
      .json({ message: "Income Created Successfully", data: income });
  },

  handleGetRecentIncome: async (req: CustomRequest, res: Response) => {
    const organizationId = req.user?.organizationId;
    const { pageNumber, pageSize } = req.query;

    if (!organizationId)
      throw new BadRequestError("Organization Id is not found");

    const income = await IncomeService.getRecentIncomeByOrganization(
      organizationId,
      Number(pageSize),
      Number(pageNumber),
    );
    res
      .status(201)
      .json({ message: "Income Created Successfully", data: income });
  },
};

export default IncomeController;
