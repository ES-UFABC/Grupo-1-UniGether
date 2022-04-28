import { EventController } from "../app/controllers/EventController";
import { ensureAuthenticated } from "../middlewares/authentication";
import multer from "multer";
import multerConfig from "../config/multer.config";
import express, { Router } from "express";
import { resolve } from 'path'

const eventController = new EventController();
const images = new Router();

const upload = multer(multerConfig.upload("./images"));

images.post("/", ensureAuthenticated, upload.single("file"), eventController.addImage);

images.use('/file', express.static(resolve(__dirname, '..', '..', 'tmp', 'image')));

export default images