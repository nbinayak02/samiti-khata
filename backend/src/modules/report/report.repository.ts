import { prisma } from "../../lib/prisma";
import {
  TSearchByDocumentWhereClause,
  TSearchByNameWhereClause,
} from "./report.type";

const ReportRepository = {
  searchByDocument: async (where: TSearchByDocumentWhereClause) => {
    return prisma.income.findMany({
      where,
      include: {
        committee: { select: { id: true, name: true } },
        billIssuer: {
          select: { id: true, name: true },
        },
      },
    });
  },
  searchByName: async (where: TSearchByNameWhereClause) => {
    return prisma.income.findMany({
      where,
      include: {
        committee: { select: { id: true, name: true } },
        billIssuer: {
          select: { id: true, name: true },
        },
      },
    });
  },
};

export default ReportRepository;
