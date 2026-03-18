import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import validator from "../../middlewares/validator";
import committeeSchema from "./committee.schema";
import CommitteeController from "./committee.controller";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser(["OWNER", "ADMIN"]),
  validator(committeeSchema),
  CommitteeController.handleCreate,
);

// get all committees for all organizations
router.get(
  "/",
  authenticateUser,
  authorizeUser(["OWNER"]),
  CommitteeController.handleGetAll,
);

router.get("/:id", authenticateUser, CommitteeController.handleGetById);

router.get("/:orgId", authenticateUser, CommitteeController.handleGetAllByOrgId);

export default router;
