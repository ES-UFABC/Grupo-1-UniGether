import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import { MatchController } from "../app/controllers/MatchController";

const matchController = new MatchController();
const matches = new Router();

matches.post("/", ensureAuthenticated, matchController.store);
matches.delete("/:id", ensureAuthenticated, matchController.delete);
matches.get("/", ensureAuthenticated, matchController.loadMatches);

export default matches;