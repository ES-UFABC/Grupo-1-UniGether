import { Router } from "express";
import { UserController } from "../app/controllers/UserController";
import { ensureAuthenticated } from "../middlewares/authentication";

const userController = new UserController();
const users = new Router();

users.post("/", userController.create);
users.get("/", ensureAuthenticated, userController.getUsers);
users.get("/:id", ensureAuthenticated, userController.getUserById);
users.get('/name/:name', ensureAuthenticated, userController.getUsersByName);
users.delete("/", ensureAuthenticated, userController.delete);
users.put("/", ensureAuthenticated, userController.update);

export default users;