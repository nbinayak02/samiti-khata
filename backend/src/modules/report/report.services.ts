import ReportRepository from "./report.repository";
import {
  TSearchByDocument,
  TSearchByDocumentWhereClause,
  TSearchByName,
  TSearchByNameWhereClause,
} from "./report.type";

const ReportService = {
  searchByDocument: async (payload: TSearchByDocument) => {
    const whereClause: TSearchByDocumentWhereClause = {};

    if (payload.committeeId)
      whereClause.committeeId = Number(payload.committeeId);

    if (payload.billNumber) whereClause.billNumber = payload.billNumber;
    if (payload.bookNumber) whereClause.bookNumber = payload.bookNumber;

    if (payload.fromDate)
      whereClause.date = {
        ...whereClause.date,
        gte: new Date(payload.fromDate),
      };

    if (payload.toDate)
      whereClause.date = { ...whereClause.date, lte: new Date(payload.toDate) };

    if (payload.billIssuerId)
      whereClause.billIssuerId = Number(payload.billIssuerId);

    return await ReportRepository.searchByDocument(whereClause);
  },
  searchByName: async (payload: TSearchByName) => {
    const whereClause: TSearchByNameWhereClause = {};
    if (payload.committeeId)
      whereClause.committeeId = Number(payload.committeeId);

    if (payload.name)
      whereClause.name = { contains: payload.name, mode: "insensitive" };

    if (payload.fromDate)
      whereClause.date = {
        ...whereClause.date,
        gte: new Date(payload.fromDate),
      };

    if (payload.toDate)
      whereClause.date = { ...whereClause.date, lte: new Date(payload.toDate) };

    if (payload.billIssuerId)
      whereClause.billIssuerId = Number(payload.billIssuerId);

    return await ReportRepository.searchByName(whereClause);
  },
};
export default ReportService;
