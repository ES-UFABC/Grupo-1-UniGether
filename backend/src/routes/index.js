import { Router } from "express";
import users  from "./users.routes"
import sessions from "./session.routes"
import avatars from "./avatar.routes"

const routes = new Router()

routes.use("/users", users)
routes.use("/sessions", sessions)
routes.use("/avatars", avatars)

export default routes;
