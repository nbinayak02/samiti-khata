import { prisma } from "../../lib/prisma";
import { ISearchQuery, TSearchByDocument, TSearchByName } from "./report.type";

const ReportRepository = {
  searchByDocument: async ({
    committeeId,
    documentNumber,
    documentType,
    billIssuerId,
    fromDate,
    toDate,
  }: TSearchByDocument) => {
    return prisma.income.findMany({
      where: {
        committeeId,
        [documentType]: String(documentNumber),
        date: {
          ...(fromDate && { gte: new Date(fromDate) }),
          ...(toDate && { lte: new Date(toDate) }),
        },

        // if billIssuerId is truthy, return object, else returns falsy value which prisma ignores
        // spread operator adds that object to the parent object
        ...(billIssuerId && { billIssuerId }),
      },
      include: {
        committee: { select: { id: true, name: true } },
        billIssuer: {
          select: { id: true, name: true },
        },
      },
    });
  },
  searchByName: async ({
    committeeId,
    name,
    fromDate,
    toDate,
    billIssuerId,
  }: TSearchByName) => {
    return prisma.income.findMany({
      where: {
        committeeId,
        name: {
          contains: name,
          mode: "insensitive",
        },
        date: {
          ...(fromDate && { gte: fromDate }),
          ...(toDate && { lte: toDate }),
        },
        ...(billIssuerId && { billIssuerId }),
      },
    });
  },
};

export default ReportRepository;
