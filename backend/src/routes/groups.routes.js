import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import { GroupController } from "../app/controllers/GroupController";

const groupController = new GroupController();
const groups = new Router();

// groups.get("/", ensureAuthenticated, groupController.findAllGroups);
groups.get("/:user_id", ensureAuthenticated, groupController.index);
groups.get("/", ensureAuthenticated, groupController.findAllGroupsOpen);
groups.post("/:user_id", ensureAuthenticated, groupController.store);
groups.post("/:user_id/:id", ensureAuthenticated, groupController.insertUsers);
groups.delete("/:user_id/:id", ensureAuthenticated, groupController.deleteByUser);
groups.delete("/:id", ensureAuthenticated, groupController.delete);

export default groups;