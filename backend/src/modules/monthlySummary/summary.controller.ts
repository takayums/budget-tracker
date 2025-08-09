import { NextFunction, Request, Response } from "express";
import { UserRequest } from "@/type/user.request";
import MonthlySummaryService from "./summary.service";

class MonthlySummaryController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await MonthlySummaryService.getAll();
      res
        .status(200)
        .json({ success: true, message: "Summery berhasil", data: summary });
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const summary = await MonthlySummaryService.getById(id);
      res.status(200).json({
        success: true,
        message: "Berhasil data summary",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const data = { ...req.body, user_id: req.userId };
      const summary = await MonthlySummaryService.create(data);
      res.status(201).json({
        success: true,
        message: "Berhasil membuat summary",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const data = { ...req.body, user_id: req.userId };
      const summary = await MonthlySummaryService.update(id, data);
      res.status(201).json({
        success: true,
        message: "Berhasil update summary",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const summary = await MonthlySummaryService.delete(id);
      res
        .status(200)
        .json({
          success: true,
          message: "Berhasil delete summary",
          data: summary,
        });
    } catch (error) {
      next(error);
    }
  }
  async generate(req: Request, res: Response, next: NextFunction) {}
}

export default new MonthlySummaryController();
