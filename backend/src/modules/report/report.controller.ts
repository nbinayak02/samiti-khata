import { Response } from "express";
import ReportService from "./report.services";
import { CustomRequest } from "../../types/customRequest";
import { TResponsePayloadPaginated } from "../../types/responseType";

const ReportController = {
  handleSearchIncomeReport: async (req: CustomRequest, res: Response) => {
    let response: TResponsePayloadPaginated;

    if (req.query.isSearchByDocument === "true") {
      const { incomeData, totalCount } =
        await ReportService.searchIncomeByDocument(req.query);
      response = {
        message: "Search results retrieved successfully",
        data: incomeData,
        pageNumber: Number(req.query.currentPage) || 1,
        pageSize: Number(req.query.pageSize) || 10,
        totalPages: Math.ceil(totalCount / (Number(req.query.pageSize) || 10)),
      };
    } else {
      const { incomeData, totalCount } = await ReportService.searchIncomeByName(
        req.query,
      );
      response = {
        message: "Search results retrieved successfully",
        data: incomeData,
        pageNumber: Number(req.query.pageNumber) || 1,
        pageSize: Number(req.query.pageSize) || 10,
        totalPages: Math.ceil(totalCount / (Number(req.query.pageSize) || 10)),
      };
    }

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
};

export default ReportController;
