import express, { Response, Request } from "express";

import userRoutes from "@/modules/users/users.route";
import authRoutes from "@/modules/auth/auth.route";
import categoryRoutes from "@/modules/category/category.route";
import transactionRoutes from "@/modules/transaction/transaction.route";

import NotFoundError from "@/errors/NotFoundError";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/category", categoryRoutes);
router.use("/transaction", transactionRoutes);

router.use((req: Request, res: Response) => {
  throw new NotFoundError("Route Tidak Ditemukan!");
});

export default router;
