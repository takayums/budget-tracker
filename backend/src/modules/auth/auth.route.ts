import express from "express";
import AuthController from "@/modules/auth/auth.controller";
import asyncErrorHanlder from "@/errors/asyncErrorHandler";
import {
  loginValidator,
  registerValidator,
} from "@/modules/auth/auth.validator";
import validateRequest from "@/middlewares/validation.middleware";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validateRequest,
  asyncErrorHanlder(AuthController.register),
);
router.post(
  "/login",
  loginValidator,
  validateRequest,
  asyncErrorHanlder(AuthController.login),
);
router.get("/profile/:userId", asyncErrorHanlder(AuthController.profile));

export default router;
