import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import { GroupController } from "../app/controllers/GroupController";

const groupController = new GroupController();
const groups = new Router();

groups.post("/users/:user_id/groups", ensureAuthenticated, groupController.create);
groups.get("/users/:user_id/groups", ensureAuthenticated, groupController.index);

export default groups;