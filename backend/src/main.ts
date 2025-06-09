import express, { Request, Response } from "express";
import { config } from "./config/config";
import app from "./app";

const port = config.server.port || 5001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
