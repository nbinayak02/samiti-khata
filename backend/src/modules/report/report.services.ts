import IncomeRepository from "../income/income.repository";
import {
  TSearchByDocument,
  TSearchByDocumentWhereClause,
  TSearchByName,
  TSearchByNameWhereClause,
} from "../income/income.types";

const ReportService = {
  searchByDocument: async (payload: TSearchByDocument) => {
    const whereClause: TSearchByDocumentWhereClause = {};
    // console.log(payload);
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

    let skip, take;
    if (Number(payload.currentPage) && Number(payload.pageSize)) {
      skip = (Number(payload.currentPage) - 1) * Number(payload.pageSize);
      take = Number(payload.pageSize);
    } else {
      skip = 0;
      take = 10;
    }

    // console.log({ skip, take });

    const incomeData = await IncomeRepository.searchByDocument(
      whereClause,
      skip,
      take,
    );
    const totalCount = await IncomeRepository.countByDocument(whereClause);

    return {
      incomeData,
      totalCount,
    };
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

    const incomeData = await IncomeRepository.searchByName(whereClause);
    const totalCount = await IncomeRepository.countByName(whereClause);

    return {
      incomeData,
      totalCount,
    };
  },
};
export default ReportService;
