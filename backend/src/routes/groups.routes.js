import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import { GroupController } from "../app/controllers/GroupController";

const groupController = new GroupController();
const groups = new Router();

groups.get("/users/:user_id/groups", ensureAuthenticated, groupController.index);
groups.post("/users/:user_id/groups", ensureAuthenticated, groupController.create);
groups.delete("/users/:user_id/groups", ensureAuthenticated, groupController.delete)

export default groups;