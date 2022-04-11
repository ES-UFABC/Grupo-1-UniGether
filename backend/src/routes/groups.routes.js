import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import { GroupController } from "../app/controllers/GroupController";

const groupController = new GroupController();
const groups = new Router();

groups.get("/:user_id", ensureAuthenticated, groupController.index);
groups.post("/:user_id", ensureAuthenticated, groupController.store);
groups.delete("/:user_id/:id", ensureAuthenticated, groupController.delete);

export default groups;