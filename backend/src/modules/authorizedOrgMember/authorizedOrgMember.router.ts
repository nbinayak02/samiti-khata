// This file has been renamed from billIssuer to authorizedOrgMember.
// This module can reflect persons that can issue bills (income), perform payments (expense)

import express from "express";
import asyncHandler from "../../utlis/asyncHandler";
import validator from "../../middlewares/validator";
import { authorizeUser } from "../../middlewares/authorization";
import { authenticateUser } from "../../middlewares/authentication";
import authorizedOrgMemberSchema from "./authorizedOrgMember.schema";
import AuthorizedOrgMemberController from "./authorizedOrgMember.controller";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  validator(authorizedOrgMemberSchema),
  asyncHandler(AuthorizedOrgMemberController.handleCreate),
);

router.get(
  "/organization",
  authenticateUser,
  authorizeUser(["ADMIN", "OPERATOR"]),
  asyncHandler(AuthorizedOrgMemberController.handleGetByOrganization),
);

export default router;
