import ExpenseRepository from "../expense/expense.repository";
import {
  TExpenseSearch,
  TExpenseSearchWhereClause,
} from "../expense/expense.types";
import IncomeRepository from "../income/income.repository";
import {
  TSearchByDocument,
  TSearchByDocumentWhereClause,
  TSearchByName,
  TSearchByNameWhereClause,
} from "../income/income.types";

const ReportService = {
  searchIncomeByDocument: async (payload: TSearchByDocument) => {
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
  searchIncomeByName: async (payload: TSearchByName) => {
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

    let skip, take;
    if (Number(payload.currentPage) && Number(payload.pageSize)) {
      skip = (Number(payload.currentPage) - 1) * Number(payload.pageSize);
      take = Number(payload.pageSize);
    } else {
      skip = 0;
      take = 10;
    }

    const incomeData = await IncomeRepository.searchByName(
      whereClause,
      skip,
      take,
    );
    const totalCount = await IncomeRepository.countByName(whereClause);

    return {
      incomeData,
      totalCount,
    };
  },
  searchExpense: async (payload: TExpenseSearch) => {
    const whereClause: TExpenseSearchWhereClause = {};
    // console.log(payload);
    if (payload.name) whereClause.name = payload.name;
    if (payload.address) whereClause.address = payload.address;

    if (payload.committeeId)
      whereClause.committeeId = Number(payload.committeeId);
    if (payload.categoryId) whereClause.categoryId = Number(payload.categoryId);

    if (payload.fromDate)
      whereClause.date = {
        ...whereClause.date,
        gte: new Date(payload.fromDate),
      };

    if (payload.toDate)
      whereClause.date = { ...whereClause.date, lte: new Date(payload.toDate) };

    let skip, take;
    if (Number(payload.currentPage) && Number(payload.pageSize)) {
      skip = (Number(payload.currentPage) - 1) * Number(payload.pageSize);
      take = Number(payload.pageSize);
    } else {
      skip = 0;
      take = 10;
    }

    // console.log({ skip, take });

    const expenseData = await ExpenseRepository.search(
      whereClause,
      skip,
      take,
    );
    const totalCount = await ExpenseRepository.count(whereClause);

    return {
      expenseData,
      totalCount,
    };
  },
};
export default ReportService;
