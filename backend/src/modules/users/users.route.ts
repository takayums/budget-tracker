import express from "express";
import asyncErrorHanlder from "@/errors/asyncErrorHandler";
import validateRequest from "@/middlewares/validation.middleware";
import usersController from "@/modules/users/users.controller";
import {
  createUsersValidator,
  idParamsValidator,
  updateUsersValidator,
} from "@/modules/users/users.validator";

const route = express.Router();

route.get("/", asyncErrorHanlder(usersController.getAll.bind(usersController)));
route.get(
  "/:id",
  idParamsValidator,
  validateRequest,
  asyncErrorHanlder(usersController.getById.bind(usersController)),
);
route.post(
  "/",
  createUsersValidator,
  validateRequest,
  asyncErrorHanlder(usersController.create.bind(usersController)),
);
route.patch(
  "/:id",
  idParamsValidator,
  updateUsersValidator,
  validateRequest,
  asyncErrorHanlder(usersController.update.bind(usersController)),
);
route.delete(
  "/:id",
  idParamsValidator,
  validateRequest,
  asyncErrorHanlder(usersController.delete.bind(usersController)),
);

export default route;
