import { Request, Response } from "express";
import config from "@/config/config";
import db from "@models/db";
import app from "@/app";

const port = config.server.port || 5001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Test database connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully.",
    );
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });
