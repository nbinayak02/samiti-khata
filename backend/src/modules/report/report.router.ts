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

export default router;
