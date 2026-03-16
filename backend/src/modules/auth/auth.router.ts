import express from "express";
import { authController } from "./auth.controller";
import asyncHandler from "../../utlis/asyncHandler";
import validator from "../../middlewares/validator";
import { logInSchema, signUpSchema } from "./auth.schema";
import { authenticateUser } from "../../middlewares/authentication";

const router = express.Router();

// public routes

router.post(
  "/signup",
  validator(signUpSchema),
  asyncHandler(authController.handleSignUp),
);

router.post(
  "/login",
  validator(logInSchema),
  asyncHandler(authController.handleLogIn),
);

router.post("/refresh", asyncHandler(authController.handleTokenRefresh));

// protected routes

router.get("/", authenticateUser, asyncHandler(authController.getUserProfile));



export default router;
