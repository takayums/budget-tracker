import { NextFunction, Response, Request } from "express";
import { UserRequest } from "@/type/user.request";
import TransactionService from "@/modules/transaction/transaction.service";
import ForbiddenError from "@/errors/ForbiddenError";
import Transaction from "./transaction.model";

class TransactionController {
  async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const search = (req.query.search as string) || "";
      const transaction = await TransactionService.getAll(
        req.userId as number,
        page,
        limit,
        search,
      );
      res.status(200).json({
        success: true,
        message: "Daftar transaksi berhasil",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const transaction = await TransactionService.getById(id);
      // if (transaction.user_id !== id) {
      //   throw new ForbiddenError("Kamu tidak bisa akses transaksi ini");
      //   return;
      // }
      res.status(200).json({
        success: true,
        message: "Transaksi ditemukan",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const data = { ...req.body, user_id: req.userId };
      const transaction = await TransactionService.create(data);
      res.status(201).json({
        success: true,
        message: "Berhasil buat transaksi",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const data = { ...req.body };
      delete data.user_id;

      const transactionId = await TransactionService.getById(id);
      if (transactionId.user_id !== req.userId) {
        throw new ForbiddenError("Kamu tidak memiliki akses atas hal ini");
      }

      const transaction = await TransactionService.update(id, data);
      res.status(201).json({
        success: true,
        message: "Transaksi sudah diupdate",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      await TransactionService.delete(id);
      res
        .status(200)
        .json({ succes: true, message: "transaksi sudah di hapus" });
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();
