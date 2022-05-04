const { Router } = require("express");
const UserController = require("../app/controllers/UserController.js");
const { ensureAuthenticated } = require("../middlewares/authentication.js");

const userController = new UserController();
const users = new Router();

users.post("/", userController.create);
users.get("/", ensureAuthenticated, userController.getUsers);
users.get("/:id", ensureAuthenticated, userController.getUserById);
users.get('/name/:name', ensureAuthenticated, userController.getUsersByName);
users.delete("/", ensureAuthenticated, userController.delete);
users.put("/", ensureAuthenticated, userController.update);

module.exports = users;