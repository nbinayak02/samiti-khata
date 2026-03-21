import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserController from "./user.controller";
import validator from "../../middlewares/validator";
import approveAdminSchema from "./user.schema";
import asyncHandler from "../../utlis/asyncHandler";
const router = express.Router();

// get all admin for owner
router.get(
  "/admin",
  authenticateUser,
  authorizeUser(["OWNER"]),
  asyncHandler(UserController.handleGetAllAdmins),
);

// get all operators for admin
router.get(
  "/operator",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  asyncHandler(UserController.handleGetAllOperators),
);

// approve admin
router.post(
  "/approve-admin",
  authenticateUser,
  authorizeUser(["OWNER"]),
  validator(approveAdminSchema),
  asyncHandler(UserController.handleApproveAdmin),
);

export default router;
