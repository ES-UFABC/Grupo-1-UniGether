const EventController = require("../app/controllers/EventController");
const { ensureAuthenticated } = require("../middlewares/authentication");
const multer = require("multer");
const multerConfig = require("../config/multer.config");
const express = require("express");
const { resolve } = require('path')

const eventController = new EventController();
const images = new express.Router();

const upload = multer(multerConfig.upload("./images"));

images.post("/", ensureAuthenticated, upload.single("file"), eventController.addImage);

images.use('/file', express.static(resolve(__dirname, '..', '..', 'tmp', 'image')));

module.exports = images