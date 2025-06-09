import { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const corsOption = {
  origin: process.env.CORS_ORIGIN || "*",
  method: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const enableCors = cors(corsOption);

export const setSecurityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  helmet({
    contentSecurityPolicy: false,
    frameguard: { action: "deny" },
    xssFilter: true,
    noSniff: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  });

  next();
};
