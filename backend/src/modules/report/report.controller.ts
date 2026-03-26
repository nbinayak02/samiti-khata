import { Response } from "express";
import ReportService from "./report.services";
import { TSearchByDocument, TSearchByName } from "./report.type";
import { CustomRequest } from "../../types/customRequest";

const ReportController = {
  handleSearchIncomeReport: async (req: CustomRequest, res: Response) => {
    let response;

    if (req.query.isSearchByDocument === "true") {
      response = await ReportService.searchByDocument(
        req.query as TSearchByDocument,
      );
    } else {
      response = await ReportService.searchByName(req.query as TSearchByName);
    }

    res.status(200).json({
      message: "Search results retrieved successfully",
      data: response,
    });
  },
};

export default ReportController;
