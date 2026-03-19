import express from "express";
import asyncHandler from "../../utlis/asyncHandler";
import validator from "../../middlewares/validator";
import organizationSchema from "./organization.schema";
import { authorizeUser } from "../../middlewares/authorization";
import { organizationController } from "./organization.controller";
import { authenticateUser } from "../../middlewares/authentication";

const router = express.Router();

// get organizations to the logged in OWNER
router.get(
  "/",
  authenticateUser,
  authorizeUser(["OWNER"]),
  asyncHandler(organizationController.handleGetOrganizationsByUser),
);

// get admin/operator assigned organization
router.get(
  "/user-assigned",
  authenticateUser,
  asyncHandler(organizationController.handleGetAssignedOrganizationByUserId),
);

router.post(
  "/",
  authenticateUser,
  authorizeUser(["OWNER"]),
  validator(organizationSchema),
  asyncHandler(organizationController.handleCreateOrganization),
);

export default router;
