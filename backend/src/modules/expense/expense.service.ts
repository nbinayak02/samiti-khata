import ExpenseRepository from "./expense.repository";
import { TExpenseFormData } from "./expense.types";

const ExpenseService = {
  create: async (data: TExpenseFormData, createdBy: number) => {
    return await ExpenseRepository.create(data, createdBy);
  },
  getRecentExpenseByOrganization: async (
    organizationId: number,
    pageSize: number,
    pageNumber: number,
  ) => {
    if (isNaN(pageSize)) pageSize = 10;
    if (isNaN(pageNumber)) pageNumber = 1;
    return await ExpenseRepository.getRecentExpensesByOrganizationPaginated(
      organizationId,
      pageSize,
      pageNumber,
    );
  },
};

export default ExpenseService;
