import ExpenseRepository from "./expense.repository";
import { TExpenseFormData, TExpenseUpdate } from "./expense.types";

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

  update: async (
    id: number,
    data: TExpenseUpdate,
    organizationId: number,
    userId: number,
  ) => {
    const { description, ...otherData } = data;
    const payload = {
      ...otherData,
      date: new Date(otherData.date).toISOString(),
    };
    const logInfo = { description, organizationId, userId };

    return await ExpenseRepository.update(id, payload, logInfo);
  },

  getById: async (id: number) => {
    return await ExpenseRepository.getById(id);
  },

  archive: async (
    id: number,
    userId: number,
    organizationId: number,
    description: string,
  ) => {
    return await ExpenseRepository.softDelete(id, {
      description,
      organizationId,
      userId,
    });
  },
};

export default ExpenseService;
