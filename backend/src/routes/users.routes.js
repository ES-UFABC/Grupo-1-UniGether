import { Router } from "express";
import {UserController} from "../app/controllers/UserController";
import {ensureAuthenticated} from "../middlewares/authentication";

const userController = new UserController();
const users = new Router();

users.post("/",userController.create);
users.get("/", ensureAuthenticated, userController.index);
users.get("/:id", ensureAuthenticated, userController.indexUser);
users.get('/', ensureAuthenticated,userController.findByName);
users.delete("/", ensureAuthenticated, userController.delete);
users.put("/", ensureAuthenticated, userController.update);

export default users;