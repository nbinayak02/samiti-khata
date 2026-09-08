import express from "express";
import asyncHandler from "../../utlis/asyncHandler";
import HealthController from "./health.controller";
const router = express.Router();

router.get("/", asyncHandler(HealthController.handleCheckHealth));

export default router
