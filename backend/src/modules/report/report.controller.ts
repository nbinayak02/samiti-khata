import z from "zod";
import { Response } from "express";
import ReportService from "./report.services";
import SearchReportSchema from "./report.schema";
import { CustomRequest } from "../../types/customRequest";
import { ValidationError } from "../../errors/customError";
import { TSearchByDocument } from "./report.type";

const ReportController = {
  handleSearchIncomeReport: async (req: CustomRequest, res: Response) => {
    const response = await ReportService.searchByDocument(
      req.query as TSearchByDocument,
    );
    res.status(200).json({
      message: "Search results retrieved successfully",
      data: response,
    });
  },
};

export default ReportController;
