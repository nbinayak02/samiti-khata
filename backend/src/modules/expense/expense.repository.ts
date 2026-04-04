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

  update: async (data: TExpenseFormData, id: number) => {
    return await prisma.expense.update({
      where: {
        id,
      },
      data: {
        ...data,
        remarks: data.remarks || null,
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
    takePage: number | undefined,
  ) => {
    return prisma.expense.findMany({
      skip,
      take: takePage,
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

  getById: async (id: number) => {
    return prisma.expense.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        committee: true,
      },
    });
  },
};

export default ExpenseRepository;
