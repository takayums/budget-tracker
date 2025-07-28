import { NextFunction, Request, Response } from "express";
import NotFoundError from "@/errors/NotFoundError";
import BadRequestError from "@/errors/BadRequestError";
import UserService from "@/modules/users/users.service";

/**
 * @class UserClass
 * @description Menangani Request HTTP User
 */

class UserController {
  /**
   * Get All User
   * GET /api/users
   */

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await UserService.getAll();
      if (users.length === 0)
        throw new NotFoundError("Data user belum ada boy!!!");
      res.status(200).json({
        success: true,
        message: "User berhasil didapatkan",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get User By Id
   * GET /api/users/:id
   */

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        throw new BadRequestError("User tidak ada boy");
      }

      const user = await UserService.getById(id);

      if (!user) {
        throw new BadRequestError("User tidak ada boy");
      }

      res.status(200).json({
        success: true,
        message: "User berhasil didaptkan",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create User
   * POST /api/users
   */

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await UserService.create(req.body);
      res
        .status(201)
        .json({ success: true, message: "User berhasil dibuat", data: user });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update User
   * PATCH /users/:id
   */

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const data = req.body;
      const user = await UserService.update(id, data);
      if (!user) throw new NotFoundError("Data User Tidak Ditemukan");
      res
        .status(200)
        .json({ succes: true, message: "User berhasil di update", data: user });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete User
   * DELETE /api/users/:id
   */

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await UserService.delete(id);

      if (!user) {
        throw new NotFoundError("Data User tidak ditemukan");
      }
      res
        .status(200)
        .json({ success: true, message: "User berhasil dihapus", data: user });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
