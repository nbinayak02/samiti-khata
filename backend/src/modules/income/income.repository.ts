import { prisma } from "../../lib/prisma";
import { TIncomeFormData, TSearchIncomeWhereClause } from "./income.types";

const IncomeRepository = {
  create: async (data: TIncomeFormData, createdBy: number) => {
    return await prisma.income.create({
      data: {
        ...data,
        createdBy,
        remarks: data.remarks || null,
      },
    });
  },

  getRecentIncomesByOrganizationPaginated: async (
    organizationId: number,
    pageSize: number,
    pageNumber: number,
  ) => {
    return await prisma.income.findMany({
      where: {
        deletedAt: null,
        committee: {
          organizationId,
        },
      },
      include: {
        billIssuer: true,
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
    where: TSearchIncomeWhereClause,
    skip: number,
    takePage: number | undefined,
  ) => {
    return prisma.income.findMany({
      skip,
      take: takePage,
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        committee: { select: { id: true, name: true } },
        billIssuer: {
          select: { id: true, name: true },
        },
      },
    });
  },

  count: async (where: TSearchIncomeWhereClause) => {
    return prisma.income.count({
       where: {
        ...where,
        deletedAt: null,
      },
    });
  },

  getById: async (id: number, organizationId: number) => {
    return await prisma.income.findFirst({
      where: {
        id,
        committee: {
          organizationId,
        },
      },
      include: {
        billIssuer: true,
        committee: true,
      },
    });
  },

  update: async (id: number, data: TIncomeFormData) => {
    return await prisma.income.update({
      where: {
        id,
      },
      data: {
        ...data,
        remarks: data.remarks || null,
      },
    });
  },

  delete: async (id: number) => {
    return await prisma.income.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });
  },
};

export default IncomeRepository;
