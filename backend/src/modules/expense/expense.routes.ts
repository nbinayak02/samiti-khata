import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import validator from "../../middlewares/validator";
import asyncHandler from "../../utlis/asyncHandler";
import { expenseSchema } from "./expense.schema";
import ExpenseController from "./expense.contoller";
import { softDeleteSchema } from "../income/income.schema";
const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  validator(expenseSchema),
  asyncHandler(ExpenseController.handleCreateExpense),
);

router.put(
  "/:id",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  validator(expenseSchema),
  asyncHandler(ExpenseController.handleUpdate),
);

router.get(
  "/recent",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  asyncHandler(ExpenseController.handleGetRecentExpense),
);

router.get(
  "/:id",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  asyncHandler(ExpenseController.handleGetById),
);

router.patch(
  "/archive/:id",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  validator(softDeleteSchema),
  asyncHandler(ExpenseController.handleArchive),
);

export default router;
