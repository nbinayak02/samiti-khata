import express from "express";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserController from "./user.controller";
const router = express.Router();

// get all admin for owner
router.get(
  "/admin",
  authenticateUser,
  authorizeUser(["OWNER"]),
  UserController.handleGetAllAdmins,
);

// get all operators for admin
router.get(
  "/operator",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  UserController.handleGetAllOperators,
);

export default router;
