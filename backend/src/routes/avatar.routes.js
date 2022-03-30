import { Router } from "express";
import {UserController} from "../app/controllers/UserController";
import {ensureAuthenticated} from "../middlewares/authentication";
import multer from "multer";
import multerConfig from "../config/multer.config";

const userController = new UserController();
const avatars = new Router();

const upload = multer(multerConfig.upload("./avatar"));

avatars.post("/", ensureAuthenticated, upload.single("avatar"), userController.addAvatar);
avatars.get("/", ensureAuthenticated, userController.getAvatar);

export default avatars