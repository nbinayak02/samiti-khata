import { Response } from "express";
import ReportService from "./report.services";
import { CustomRequest } from "../../types/customRequest";
import { TResponsePayloadPaginated } from "../../types/responseType";

const ReportController = {
  handleSearchIncomeReport: async (req: CustomRequest, res: Response) => {
    let response: TResponsePayloadPaginated;

    if (req.query.isSearchByDocument === "true") {
      const { incomeData, totalCount } = await ReportService.searchByDocument(
        req.query,
      );
      response = {
        message: "Search results retrieved successfully",
        data: incomeData,
        pageNumber: Number(req.query.currentPage) || 1,
        pageSize: Number(req.query.pageSize) || 10,
        totalPages: Math.ceil(totalCount / (Number(req.query.pageSize) || 10)),
      };
    } else {
      const { incomeData, totalCount } = await ReportService.searchByName(
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
};

export default ReportController;
