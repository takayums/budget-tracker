import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Terjadi kesalahan pada server",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

export default app;
