import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import validator from "../../middlewares/validator";
import asyncHandler from "../../utlis/asyncHandler";
import ExpenseSchema from "./expense.schema";
import ExpenseController from "./expense.contoller";
const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  validator(ExpenseSchema),
  asyncHandler(ExpenseController.handleCreateExpense),
);

router.put(
  "/:id",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  validator(ExpenseSchema),
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

export default router;
