import { Router } from "express";
import {UserController} from "../app/controllers/UserController";
import {ensureAuthenticated} from "../middlewares/authentication"

const userController = new UserController();
const users = new Router();

users.post("/", userController.createUser);
users.delete("/", ensureAuthenticated, userController.deleteUser);
users.put("/", ensureAuthenticated, userController.updateUser);

export default users;