import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import HttpError from "../errors/HttpError";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }

  if (process.env.NODE_ENV == "development") {
    if (err instanceof Error) {
      res.status(500).json({ success: false, message: err.message });
      return;
    }
  }

  console.error("error", err);

  res.status(500).json({
    status: false,
    message: "Server Error",
  });
  return;
};
