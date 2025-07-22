import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function validateRequest(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validaton Input Gagal",
      errors: result.array().map((e) => ({ params: e.type, msg: e.msg })),
    });
    return;
  }
  next();
}

export default validateRequest;
