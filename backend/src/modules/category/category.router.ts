import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import validator from "../../middlewares/validator";
import CategorySchema from "./category.schema";
import asyncHandler from "../../utlis/asyncHandler";
import CategoryController from "./category.controller";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  validator(CategorySchema),
  asyncHandler(CategoryController.handleCreateCategory),
);

router.get(
  "/organization",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  asyncHandler(CategoryController.handleGetCategoriesByOrganization),
);

export default router;
