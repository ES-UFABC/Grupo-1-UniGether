import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import { GroupController } from "../app/controllers/GroupController";

const groupController = new GroupController();
const groups = new Router();

groups.get("/:id", ensureAuthenticated, groupController.getGroupById);
groups.get("/user/:user_id", ensureAuthenticated, groupController.findUserGroups);
groups.get("/opened/:user_id", ensureAuthenticated, groupController.findAllGroupsOpen);
groups.post("/", ensureAuthenticated, groupController.createGroup);
groups.post("/:id/user/:user_id", ensureAuthenticated, groupController.addUserInGroup);
groups.put("/:id", ensureAuthenticated, groupController.updateGroup);
groups.delete("/:id/user/:user_id", ensureAuthenticated, groupController.removeUser);
groups.delete("/:id", ensureAuthenticated, groupController.delete);

export default groups;