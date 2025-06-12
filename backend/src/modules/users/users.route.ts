import express from "express";
import asyncErrorHanlder from "../../errors/asyncErrorHandler";
import usersController from "./users.controller";

const route = express.Router();

route.get("/", asyncErrorHanlder(usersController.getAll.bind(usersController)));
route.get(
  "/:id",
  asyncErrorHanlder(usersController.getById.bind(usersController)),
);
route.post(
  "/",
  asyncErrorHanlder(usersController.create.bind(usersController)),
);
route.patch(
  "/:id",
  asyncErrorHanlder(usersController.update.bind(usersController)),
);
route.delete(
  "/:id",
  asyncErrorHanlder(usersController.delete.bind(usersController)),
);

export default route;
