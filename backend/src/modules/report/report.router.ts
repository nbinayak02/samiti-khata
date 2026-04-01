import express from "express";
import ReportController from "./report.controller";
import asyncHandler from "../../utlis/asyncHandler";
import { authorizeUser } from "../../middlewares/authorization";
import { authenticateUser } from "../../middlewares/authentication";
const router = express.Router();

router.get(
  "/income",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  asyncHandler(ReportController.handleSearchIncomeReport),
);

router.get(
  "/expense",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  asyncHandler(ReportController.handleSearchExpenseReport),
);

router.get(
  "/expense/download",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  asyncHandler(ReportController.handleDownloadExpenseReport),
);

export default router;
