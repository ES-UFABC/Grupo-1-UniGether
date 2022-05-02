const { Router } = require("express");
const SessionController = require("../app/controllers/SessionController.js");

const sessions = new Router();
const sessionController = new SessionController();

sessions.post("/", sessionController.getSession)

module.exports = sessions;