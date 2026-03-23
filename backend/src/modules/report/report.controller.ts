import z from "zod";
import { Response } from "express";
import ReportService from "./report.services";
import SearchReportSchema from "./report.schema";
import { CustomRequest } from "../../types/customRequest";
import { ValidationError } from "../../errors/customError";

const ReportController = {
  handleSearchIncomeReport: async (req: CustomRequest, res: Response) => {
    const validation = z.safeParse(SearchReportSchema, req.query);

    if (!validation.success) {
      const errorMessage = z.treeifyError(validation.error);
      throw new ValidationError(`Invalid query parameters`, errorMessage);
    }

    const {
      isSearchByDocument,
      name,
      committeeId,
      documentType,
      documentNumber,
      fromDate,
      toDate,
      billIssuerId,
    } = validation.data;

    let response;

    if (isSearchByDocument) {
      const payload = {
        committeeId,
        documentType: documentType!,
        documentNumber: documentNumber!,
        fromDate,
        toDate,
        billIssuerId,
      };

      response = await ReportService.searchByDocument(payload);
    } else {
      const payload = {
        committeeId,
        name: name!,
        fromDate,
        toDate,
        billIssuerId,
      };
      response = await ReportService.searchByName(payload);
    }

    res.status(200).json({
      message: "Search results retrieved successfully",
      data: response,
    });
  },
};

export default ReportController;
