import express from "express";
import asyncHandler from "../../utlis/asyncHandler";
import validator from "../../middlewares/validator";
import organizationSchema from "./organization.schema";
import { authorizeUser } from "../../middlewares/authorization";
import { organizationController } from "./organization.controller";
import { authenticateUser } from "../../middlewares/authentication";

const router = express.Router();

// get organizations of the logged in user
router.get(
  "/",
  authenticateUser,
  asyncHandler(organizationController.handleGetOrganizationsByUser),
);

// get organization by organization id
router.get(
  "/:id",
  authenticateUser,
  asyncHandler(organizationController.handleGetOrganizationById),
);

router.post(
  "/",
  authenticateUser,
  authorizeUser(["OWNER"]),
  validator(organizationSchema),
  asyncHandler(organizationController.handleCreateOrganization),
);

export default router;
