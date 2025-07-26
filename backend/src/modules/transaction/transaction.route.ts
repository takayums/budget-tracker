import express from "express";
import TransactionController from "./transaction.controller";
import authJwt from "@/middlewares/auth.middleware";
import asyncErrorHanlder from "@/errors/asyncErrorHandler";

const router = express.Router();

router.use(authJwt as any);

router.get("/", asyncErrorHanlder(TransactionController.getAll));
router.get("/:id", asyncErrorHanlder(TransactionController.getById));
router.post("/", asyncErrorHanlder(TransactionController.create));
router.patch("/:id", asyncErrorHanlder(TransactionController.update));
router.delete("/:id", asyncErrorHanlder(TransactionController.delete));

export default router;
