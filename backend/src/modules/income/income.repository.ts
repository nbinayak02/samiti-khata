import { prisma } from "../../lib/prisma";
import {
  TIncomeFormData,
  TSearchByDocumentWhereClause,
  TSearchByNameWhereClause,
} from "./income.types";

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

  searchByDocument: async (
    where: TSearchByDocumentWhereClause,
    skip: number,
    take: number,
  ) => {
    return prisma.income.findMany({
      skip,
      take,
      where,
      include: {
        committee: { select: { id: true, name: true } },
        billIssuer: {
          select: { id: true, name: true },
        },
      },
    });
  },
  searchByName: async (
    where: TSearchByNameWhereClause,
    pageNumber: number = 1,
    pageSize: number = 10,
  ) => {
    return prisma.income.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where,
      include: {
        committee: { select: { id: true, name: true } },
        billIssuer: {
          select: { id: true, name: true },
        },
      },
    });
  },

  countByDocument: async (where: TSearchByDocumentWhereClause) => {
    return prisma.income.count({
      where,
    });
  },

  countByName: async (where: TSearchByNameWhereClause) => {
    return prisma.income.count({
      where,
    });
  },
};

export default IncomeRepository;
