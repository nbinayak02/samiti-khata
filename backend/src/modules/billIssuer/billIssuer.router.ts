import express from "express";
import billIssuerSchema from "./billIssuer.schema";
import asyncHandler from "../../utlis/asyncHandler";
import validator from "../../middlewares/validator";
import BillIssuerController from "./billIssuer.controller";
import { authorizeUser } from "../../middlewares/authorization";
import { authenticateUser } from "../../middlewares/authentication";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  validator(billIssuerSchema),
  asyncHandler(BillIssuerController.handleCreateBillIssuer),
);

router.get(
  "/organization",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  asyncHandler(BillIssuerController.handleGetBillIssuersByOrganization),
);

export default router;
