import { NextFunction, Request, Response } from "express";
import CategoryService from "@/modules/category/category.service";

class CategoryController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.getAll();
      res.status(200).json({
        succes: true,
        message: "Category berhasil didapatkan",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const categoryById = await CategoryService.getById(id);
      res.status(200).json({
        succes: true,
        message: "Category ditemukan",
        data: categoryById,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const category = await CategoryService.create(data);
      res.status(201).json({
        succes: true,
        message: "Category berhasil dibuat",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const data = req.body;
      const category = await CategoryService.update(id, data);
      res.status(201).json({
        succes: true,
        message: "Category berhasil di update",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const category = await CategoryService.delete(id);
      res
        .status(200)
        .json({ succes: true, message: "Berhasil", data: category });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
