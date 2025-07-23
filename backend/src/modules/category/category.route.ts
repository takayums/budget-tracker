import express from "express";

import CategoryController from "@/modules/category/category.controller";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.post("/", CategoryController.create);
router.patch("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
