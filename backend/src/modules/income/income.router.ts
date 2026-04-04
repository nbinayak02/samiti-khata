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

router.put(
  "/:id",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  validator(incomeSchema),
  asyncHandler(IncomeController.handleUpdateIncome),
);

router.get(
  "/recent",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  asyncHandler(IncomeController.handleGetRecentIncome),
);

router.get(
  "/:id",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  asyncHandler(IncomeController.handleGetById),
);

export default router;
