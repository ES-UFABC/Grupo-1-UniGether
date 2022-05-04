const UserController = require("../app/controllers/UserController.js");
const { ensureAuthenticated } = require("../middlewares/authentication.js");
const multer = require("multer");
const multerConfig = require("../config/multer.config.js");
const express = require("express");
const { resolve } = require("path");

const userController = new UserController();
const avatars = new express.Router();

const upload = multer(multerConfig.upload("./avatar"));

avatars.post("/", ensureAuthenticated, upload.single("file"), userController.addAvatar);
avatars.get("/", ensureAuthenticated, userController.getAvatar);
avatars.get("/:id", ensureAuthenticated, userController.getAvatarById);

avatars.use('/file', express.static(resolve(__dirname, '..', '..', 'tmp', 'avatar')));

module.exports = avatars;