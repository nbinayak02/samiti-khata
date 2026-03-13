import express from "express";
import { logInSchema, signUpSchema } from "./user.schema";
import { userController } from "./user.controller";
import asyncHandler from "../../utlis/asyncHandler";
import validator from "../../middlewares/validator";

const router = express.Router();

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

export default router;
