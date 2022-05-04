const { Router } = require("express");
const users = require("./users.routes.js");
const sessions = require("./session.routes.js");
const avatars = require("./avatar.routes.js");
const groups = require("./groups.routes.js");
const matches = require("./matches.routes.js");
const messages = require("./message.routes.js");
const events = require("./event.routes.js");
const images = require("./image.routes.js");

const routes = new Router()

routes.use("/users", users)
routes.use("/avatars", avatars)
routes.use("/sessions", sessions)
routes.use("/groups", groups)
routes.use("/matches", matches)
routes.use("/messages", messages)
routes.use("/events", events)
routes.use("/images", images)

module.exports = routes;
