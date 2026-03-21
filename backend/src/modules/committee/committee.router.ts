import express from "express";
import committeeSchema from "./committee.schema";
import asyncHandler from "../../utlis/asyncHandler";
import validator from "../../middlewares/validator";
import CommitteeController from "./committee.controller";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  validator(committeeSchema),
  asyncHandler(CommitteeController.handleCreate),
);

// get all committees for the organizations of admin
router.get(
  "/",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  asyncHandler(CommitteeController.handleGetAll),
);

// get committee by id
router.get(
  "/:id",
  authenticateUser,
  asyncHandler(CommitteeController.handleGetById),
);

// can be removed if not needed, as we can get all
// committees for an organization using the above route

router.get(
  "/:orgId",
  authenticateUser,
  asyncHandler(CommitteeController.handleGetAllByOrgId),
);

export default router;
