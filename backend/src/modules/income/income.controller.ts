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
      .status(200)
      .json({ message: "Income fetched Successfully", data: income });
  },

  handleGetById: async (req: CustomRequest, res: Response) => {
    const organizationId = req.user?.organizationId;
    const { id } = req.params;

    if (!organizationId)
      throw new BadRequestError("Organization Id is not found");

    const income = await IncomeService.getById(Number(id), organizationId);

    res
      .status(200)
      .json({ message: "Income fetched Successfully", data: income });
  },

  handleUpdateIncome: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;
    const { id } = req.params;
    const organizationId = req.user?.organizationId;

    if (!userId) throw new BadRequestError("User Id is not found");
    if (!organizationId)
      throw new BadRequestError("Organization Id is not found");

    const income = await IncomeService.update(
      Number(id),
      req.body,
      organizationId,
      userId,
    );
    res
      .status(200)
      .json({ message: "Income Updated Successfully", data: income });
  },

  handleDelete: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;
    const { id } = req.params;
    const organizationId = req.user?.organizationId;
    const { description } = req.body;

    if (!userId) throw new BadRequestError("User Id is not found");
    if (!organizationId)
      throw new BadRequestError("Organization Id is not found");

    await IncomeService.delete(Number(id), userId, organizationId, description);

    res.status(200).json({ message: "Income deleted successfully" });
  },
};

export default IncomeController;
