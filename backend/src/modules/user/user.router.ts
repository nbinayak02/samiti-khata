import express from "express";
import { logInSchema, signUpSchema } from "./user.schema";
import { userController } from "./user.controller";
import asyncHandler from "../../utlis/asyncHandler";
import validator from "../../middlewares/validator";
import { authenticateUser } from "../../middlewares/authentication";

const router = express.Router();

// public routes

router.post(
  "/signup",
  validator(signUpSchema),
  asyncHandler(userController.handleSignUp),
);

router.post(
  "/login",
  validator(logInSchema),
  asyncHandler(userController.handleLogIn),
);

router.post("/refresh", asyncHandler(userController.handleTokenRefresh));

// protected routes

router.get(
  "/profile",
  authenticateUser,
  asyncHandler(userController.getUserProfile),
);


export default router;
