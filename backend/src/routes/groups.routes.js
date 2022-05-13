const { Router } = require("express");
const { ensureAuthenticated } = require("../middlewares/authentication.js");
const GroupController = require("../app/controllers/GroupController.js");

const groupController = new GroupController();
const groups = new Router();

groups.get("/:id", ensureAuthenticated, groupController.getGroupById);
groups.get("/user/:user_id", ensureAuthenticated, groupController.findUserGroups);
groups.get("/", ensureAuthenticated, groupController.findAllGroupsOpen);
groups.post("/", ensureAuthenticated, groupController.createGroup);
groups.post("/:id/user/:user_id", ensureAuthenticated, groupController.addUserInGroup);
groups.put("/:id", ensureAuthenticated, groupController.updateGroup);
groups.delete("/:id/user/:user_id", ensureAuthenticated, groupController.removeUser);
groups.delete("/:id", ensureAuthenticated, groupController.delete);

module.exports = groups;