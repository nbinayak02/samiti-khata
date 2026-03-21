import { Response } from "express";
import { CustomRequest } from "../../types/customRequest";
import { BadRequestError } from "../../errors/customError";
import ExpenseService from "./expense.service";

const ExpenseController = {
  handleCreateExpense: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new BadRequestError("User Id is not found");
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
};

export default ExpenseController;
