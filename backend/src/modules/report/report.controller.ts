import { Response } from "express";
import ReportService from "./report.services";
import { CustomRequest } from "../../types/customRequest";

const ReportController = {
  
  handleSearchIncomeReport: async (req: CustomRequest, res: Response) => {
    const { incomeData, totalCount } = await ReportService.searchIncome(
      req.query,
    );

    const response = {
      message: "Search results retrieved successfully",
      data: incomeData,
      pageNumber: Number(req.query.currentPage) || 1,
      pageSize: Number(req.query.pageSize) || 10,
      totalPages: Math.ceil(totalCount / (Number(req.query.pageSize) || 10)),
    };

    res.status(200).json(response);
  },

  handleSearchExpenseReport: async (req: CustomRequest, res: Response) => {
    const { expenseData, totalCount } = await ReportService.searchExpense(
      req.query,
    );
    res.status(200).json({
      message: "Search results retrived successfully",
      data: expenseData,
      pageNumber: Number(req.query.pageNumber) || 1,
      pageSize: Number(req.query.pageSize) || 10,
      totalPages: Math.ceil(totalCount / (Number(req.query.pageSize) || 10)),
    });
  },

  handleDownloadIncomeReport: async (req: CustomRequest, res: Response) => {
    const workbook = await ReportService.exportIncomeReport(req.query);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income_report.xlsx",
    );
    res.setHeader("Cache-Control", "no-cache no-store, must-revalidate");

    const buffer = await workbook.xlsx.writeBuffer();
    // console.log("Sending data");
    res.send(buffer);
  },

  handleDownloadExpenseReport: async (req: CustomRequest, res: Response) => {
    const workbook = await ReportService.exportExpenseReport(req.query);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_report.xlsx",
    );
    res.setHeader("Cache-Control", "no-cache no-store, must-revalidate");

    const buffer = await workbook.xlsx.writeBuffer();
    // console.log("Sending data");
    res.send(buffer);
  },
};

export default ReportController;
