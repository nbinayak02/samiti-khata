import express from "express";
import IncomeController from "./income.controller";
import asyncHandler from "../../utlis/asyncHandler";
import validator from "../../middlewares/validator";
import { authorizeUser } from "../../middlewares/authorization";
import {
  incomeSchema,
  softDeleteSchema,
  incomeUpdateSchema,
} from "./income.schema";
import { authenticateUser } from "../../middlewares/authentication";

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
  validator(incomeUpdateSchema),
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

router.patch(
  "/archive/:id",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  validator(softDeleteSchema),
  asyncHandler(IncomeController.handleDelete),
);

export default router;
