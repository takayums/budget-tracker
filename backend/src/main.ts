import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "./config/config";

const app = express();
const port = config.server.port || 5001;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
