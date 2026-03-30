import { prisma } from "../../lib/prisma";
import { TExpenseFormData, TExpenseSearchWhereClause } from "./expense.types";

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

  search: async (
    where: TExpenseSearchWhereClause,
    skip: number,
    take: number,
  ) => {
    return prisma.expense.findMany({
      skip,
      take,
      where,
      include: {
        category: true,
        committee: true,
      },
    });
  },

  count: async (where: TExpenseSearchWhereClause) => {
    return prisma.expense.count({
      where,
    });
  },
};

export default ExpenseRepository;
