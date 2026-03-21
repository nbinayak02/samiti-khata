import { prisma } from "../../lib/prisma";
import { TExpenseFormData } from "./expense.types";

const ExpenseRepository = {
  create: async (data: TExpenseFormData, userId: number) => {
    return await prisma.expense.create({
      data: {
        ...data,
        remarks: data.remarks || null,
        createdBy: userId,
      },
    });
  },

  getRecentExpensesByOrganizationPaginated: async (
    organizationId: number,
    pageSize: number,
    pageNumber: number,
  ) => {
    return await prisma.expense.findMany({
      where: {
        committee: {
          organizationId,
        },
      },
      include: {
        category: true,
        committee: true,
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    });
  },
};

export default ExpenseRepository;