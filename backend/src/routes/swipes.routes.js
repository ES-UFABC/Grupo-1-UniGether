import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import { SwipeController } from "../app/controllers/SwipeController";

const swipeController = new SwipeController();
const swipes = new Router();

swipes.post("/", ensureAuthenticated, swipeController.store);
swipes.delete("/:id", ensureAuthenticated, swipeController.delete);
swipes.get("/", ensureAuthenticated, swipeController.loadMatches);

export default swipes;