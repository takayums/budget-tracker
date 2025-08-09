import authJwt from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.use(authJwt as any);

router.get("/");
router.get("");
router.post("");
router.patch("");
router.delete("");
