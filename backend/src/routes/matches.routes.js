const { Router } = require("express");
const { ensureAuthenticated } = require("../middlewares/authentication.js");
const MatchController = require("../app/controllers/MatchController.js");

const matchController = new MatchController();
const matches = new Router();

matches.post("/", ensureAuthenticated, matchController.store);
matches.delete("/:id", ensureAuthenticated, matchController.delete);
matches.get("/:user_id1", ensureAuthenticated, matchController.loadMatches);
matches.get("/swipes/:user_id1", ensureAuthenticated, matchController.findAllSwipes);

module.exports = matches;