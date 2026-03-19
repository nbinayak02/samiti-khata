import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import validator from "../../middlewares/validator";
import committeeSchema from "./committee.schema";
import CommitteeController from "./committee.controller";
import asyncHandler from "../../utlis/asyncHandler";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser(["OWNER", "ADMIN"]),
  validator(committeeSchema),
  asyncHandler(CommitteeController.handleCreate),
);

// get all committees for all organizations
router.get(
  "/",
  authenticateUser,
  authorizeUser(["OWNER"]),
  asyncHandler(CommitteeController.handleGetAll),
);

router.get(
  "/:id",
  authenticateUser,
  asyncHandler(CommitteeController.handleGetById),
);

router.get(
  "/:orgId",
  authenticateUser,
  asyncHandler(CommitteeController.handleGetAllByOrgId),
);

export default router;
