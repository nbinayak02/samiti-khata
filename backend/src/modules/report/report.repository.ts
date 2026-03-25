import { prisma } from "../../lib/prisma";
import {
  ISearchQuery,
  TSearchByDocument,
  TSearchByDocumentWhereClause,
  TSearchByName,
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
  // searchByName: async ({
  //   committeeId,
  //   name,
  //   fromDate,
  //   toDate,
  //   billIssuerId,
  // }: TSearchByName) => {
  //   return prisma.income.findMany({
  //     where: {
  //       ...(committeeId && { committeeId }),
  //       name: {
  //         contains: name,
  //         mode: "insensitive",
  //       },
  //       date: {
  //         ...(fromDate && { gte: fromDate }),
  //         ...(toDate && { lte: toDate }),
  //       },
  //       ...(billIssuerId && { billIssuerId }),
  //     },
  //   });
  // },
};

export default ReportRepository;
