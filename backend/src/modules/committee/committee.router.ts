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

router.get(
  "/:id",
  authenticateUser,
  CommitteeController.handleGetById,
);

router.get("/:orgId", authenticateUser, CommitteeController.handleGetAll);

export default router;