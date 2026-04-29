import { Response } from "express";
import { CustomRequest } from "../../types/customRequest";
import { BadRequestError } from "../../errors/customError";
import ExpenseService from "./expense.service";

const ExpenseController = {
  handleCreateExpense: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new BadRequestError("User Id not found");
    const expense = await ExpenseService.create(req.body, userId);
    res
      .status(201)
      .json({ message: "Expense Created Successfully", data: expense });
  },

  handleGetRecentExpense: async (req: CustomRequest, res: Response) => {
    const organizationId = req.user?.organizationId;
    const { pageNumber, pageSize } = req.query;

    if (!organizationId)
      throw new BadRequestError("Organization Id is not found");

    const expense = await ExpenseService.getRecentExpenseByOrganization(
      organizationId,
      Number(pageSize),
      Number(pageNumber),
    );
    res
      .status(201)
      .json({ message: "Expense Created Successfully", data: expense });
  },

  handleUpdate: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;
    const { id } = req.params;
    const organizationId = req.user?.organizationId;

    if (!userId) throw new BadRequestError("User Id is not found");
    if (!organizationId)
      throw new BadRequestError("Organization Id is not found");

    const expense = await ExpenseService.update(
      Number(id),
      req.body,
      organizationId,
      userId,
    );

    res
      .status(200)
      .json({ message: "Expense Updated Successfully", data: expense });
  },

  handleGetById: async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const expense = await ExpenseService.getById(Number(id));
    res
      .status(200)
      .json({ message: "Expense fetched Successfully", data: expense });
  },
  handleArchive: async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const { description } = req.body;
    const userId = req.user?.id;
    const organizationId = req.user?.organizationId;

    if (!userId) throw new BadRequestError("User Id is not found");
    if (!organizationId)
      throw new BadRequestError("Organization Id is not found");

    const expense = await ExpenseService.archive(
      Number(id),
      userId,
      organizationId,
      description,
    );
    res
      .status(200)
      .json({ message: "Expense fetched Successfully", data: expense });
  },
};

export default ExpenseController;
