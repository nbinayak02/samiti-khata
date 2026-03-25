import { Response } from "express";
import ReportService from "./report.services";
import { TSearchByDocument } from "./report.type";
import { CustomRequest } from "../../types/customRequest";

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
