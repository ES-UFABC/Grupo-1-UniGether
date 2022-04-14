import { UserController } from "../app/controllers/UserController";
import { ensureAuthenticated } from "../middlewares/authentication";
import multer from "multer";
import multerConfig from "../config/multer.config";
import express, { Router } from "express";
import { resolve } from 'path'

const userController = new UserController();
const avatars = new Router();

const upload = multer(multerConfig.upload("./avatar"));

avatars.post("/", ensureAuthenticated, upload.single("file"), userController.addAvatar);
avatars.get("/", ensureAuthenticated, userController.getAvatar);
avatars.get("/:id", ensureAuthenticated, userController.getAvatarById);

avatars.use('/file', express.static(resolve(__dirname, '..', '..', 'tmp', 'avatar')));

export default avatars