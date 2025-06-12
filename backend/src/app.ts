import express, { NextFunction, Request, Response } from "express";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";
import {
  enableCors,
  setSecurityHeaders,
} from "./middlewares/security.moddleware";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(enableCors);
app.use(setSecurityHeaders);
app.use(errorHandlerMiddleware);

app.use("/api/v1", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Terjadi kesalahan pada server",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

export default app;
