import { NextFunction, Request, Response } from "express";
import AuthService from "@/modules/auth/auth.service";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await AuthService.register(data);
      res.status(201).json({
        success: true,
        message: "Register berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await AuthService.login(data);
      res.status(200).json({
        success: true,
        message: "Login berhasil",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId);
      const user = await AuthService.profile(userId);

      res.status(200).json({
        success: true,
        message: "Profile berhasil di ambil",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
