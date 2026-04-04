import ExpenseRepository from "../expense/expense.repository";
import {
  TExpenseSearch,
  TExpenseSearchWhereClause,
} from "../expense/expense.types";
import IncomeRepository from "../income/income.repository";
import {
  TSearchIncome,
  TSearchIncomeWhereClause,
} from "../income/income.types";
import ExcelJS from "exceljs";

const ReportService = {
  searchIncome: async (payload: TSearchIncome) => {
    const whereClause: TSearchIncomeWhereClause = {};
    // console.log(payload);
    if (payload.name)
      whereClause.name = {
        contains: payload.name,
        mode: "insensitive",
      };
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
    let currentPage = Number(payload.currentPage);
    let pageSize = Number(payload.pageSize) || 10;

    if (isNaN(currentPage) || isNaN(pageSize)) {
      skip = 0;
      take = 10;
    } else if (currentPage === -1) {
      skip = 0;
      take = undefined;
    } else {
      skip = (currentPage - 1) * pageSize;
      take = pageSize;
    }

    // console.log({ skip, take });

    const incomeData = await IncomeRepository.search(whereClause, skip, take);
    const totalCount = await IncomeRepository.count(whereClause);

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
    let currentPage = Number(payload.currentPage);
    console.log({ currentPage });
    let pageSize = Number(payload.pageSize) || 10;

    if (isNaN(currentPage) || isNaN(pageSize)) {
      skip = 0;
      take = 10;
    } else if (currentPage === -1) {
      skip = 0;
      take = undefined;
    } else {
      skip = (currentPage - 1) * pageSize;
      take = pageSize;
    }

    // console.log({ skip, take });

    const expenseData = await ExpenseRepository.search(whereClause, skip, take);
    const totalCount = await ExpenseRepository.count(whereClause);

    return {
      expenseData,
      totalCount,
    };
  },
  exportIncomeReport: async function (payload: TSearchIncome) {
    const { incomeData } = await this.searchIncome(payload);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Samiti Khata";
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet("Income Report");

    worksheet.columns = [
      { header: "Date", key: "date", width: 20 },
      { header: "Book Number", key: "bookNumber", width: 30 },
      { header: "Bill Number", key: "billNumber", width: 30 },
      { header: "Name", key: "name", width: 30 },
      { header: "Address", key: "address", width: 30 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Committee", key: "committee", width: 20 },
      { header: "Remarks", key: "remarks", width: 30 },
    ];

    const rows = incomeData.map((income) =>
      worksheet.addRow({
        date: income.nepaliDate,
        bookNumber: Number(income.bookNumber),
        billNumber: Number(income.billNumber),
        name: income.name,
        address: income.address,
        amount: Number(income.amount),
        committee: income.committee.name,
        remarks: income.remarks,
      }),
    );

    const totalRow = worksheet.addRow([
      null,
      null,
      null,
      null,
      null,
      "Total",
      null,
      null,
    ]);

    totalRow.getCell(6).value = { formula: `SUM(F2:F${rows.length + 1})` };

    return workbook;
  },

  exportExpenseReport: async function (payload: TExpenseSearch) {
    const { expenseData } = await this.searchExpense(payload);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Samiti Khata";
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet("Expense Report");

    worksheet.columns = [
      { header: "Date", key: "date", width: 20 },
      { header: "Committee", key: "committee", width: 20 },
      { header: "Name", key: "name", width: 30 },
      { header: "Address", key: "address", width: 30 },
      { header: "Particulars", key: "particulars", width: 30 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Category", key: "category", width: 20 },
      { header: "Payment Method", key: "paymentMethod", width: 20 },
      { header: "Document Type", key: "documentType", width: 20 },
      { header: "Remarks", key: "remarks", width: 30 },
    ];

    const rows = expenseData.map((expense) =>
      worksheet.addRow({
        date: expense.nepaliDate,
        committee: expense.committee.name,
        name: expense.name,
        address: expense.address,
        particulars: expense.particulars,
        amount: Number(expense.amount),
        category: expense.category.name,
        paymentMethod: expense.paymentMode,
        documentType: expense.documentType,
        remarks: expense.remarks,
      }),
    );

    const totalRow = worksheet.addRow([
      null,
      null,
      null,
      null,
      null,
      "Total",
      null,
      null,
      null,
      null,
    ]);

    totalRow.getCell(6).value = { formula: `SUM(F2:F${rows.length + 1})` };

    return workbook;
  },
};
export default ReportService;
