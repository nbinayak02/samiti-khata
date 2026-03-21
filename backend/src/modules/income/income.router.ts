import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import validator from "../../middlewares/validator";
import incomeSchema from "./income.schema";
import asyncHandler from "../../utlis/asyncHandler";
import IncomeController from "./income.controller";
const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  validator(incomeSchema),
  asyncHandler(IncomeController.handleCreateIncome),
);

router.get(
  "/recent",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  asyncHandler(IncomeController.handleGetRecentIncome),
);

export default router;
