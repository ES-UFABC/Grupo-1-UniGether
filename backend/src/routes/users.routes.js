import express, { Router } from "express";
import {UserController} from "../app/controllers/UserController";
import {ensureAuthenticated} from "../middlewares/authentication";
import multer from "multer";
import multerConfig from "../config/multer.config";
import { resolve } from 'path';

const userController = new UserController();
const users = new Router();
const upload = multer(multerConfig);

users.post("/",userController.create);
users.get("/", ensureAuthenticated, userController.index);
users.get("/:id", ensureAuthenticated, userController.indexUser);
users.get('/', ensureAuthenticated,userController.findByName);
users.delete("/", ensureAuthenticated, userController.delete);
users.put("/", ensureAuthenticated, upload.single("file"), userController.update);

users.use('/file', ensureAuthenticated, express.static(resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')));

export default users;