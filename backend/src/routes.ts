import express, { Response, Request } from "express";
import NotFoundError from "@/errors/NotFoundError";
import userRoutes from "@/modules/users/users.route";
import authRoutes from "@/modules/auth/auth.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.use((req: Request, res: Response) => {
  throw new NotFoundError("Route Tidak Ditemukan!");
});

export default router;
