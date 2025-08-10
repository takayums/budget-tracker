import express from "express";
import TransactionController from "./transaction.controller";
import authJwt from "@/middlewares/auth.middleware";
import asyncErrorHanlder from "@/errors/asyncErrorHandler";
import { idParamsValidator } from "../users/users.validator";
import validateRequest from "@/middlewares/validation.middleware";
import {
  createTransactionValidator,
  updateTransactionValidator,
} from "./transaction.validator";

const router = express.Router();

router.use(authJwt as any);

router.get("/", asyncErrorHanlder(TransactionController.getAll));
router.get(
  "/:id",
  idParamsValidator,
  validateRequest,
  asyncErrorHanlder(TransactionController.getById),
);
router.post(
  "/",
  createTransactionValidator,
  validateRequest,
  asyncErrorHanlder(TransactionController.create),
);
router.patch(
  "/:id",
  idParamsValidator,
  updateTransactionValidator,
  validateRequest,
  asyncErrorHanlder(TransactionController.update),
);
router.delete(
  "/:id",
  idParamsValidator,
  validateRequest,
  asyncErrorHanlder(TransactionController.delete),
);
router.get(
  "/monthly-summary",
  asyncErrorHanlder(TransactionController.getMonthlySummary),
);
router.get(
  "/monthly-chart",
  asyncErrorHanlder(TransactionController.getMonthlyChart),
);
router.get(
  "/today",
  asyncErrorHanlder(TransactionController.getTodayTransaction),
);
router.get(
  "/today-expanse-stat",
  asyncErrorHanlder(TransactionController.getTodayExpense),
);

export default router;
