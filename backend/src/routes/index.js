import { Router } from "express";
import users from "./users.routes"
import sessions from "./session.routes"
import avatars from "./avatar.routes"
import groups from "./groups.routes"
import swipes from "./swipes.routes"

const routes = new Router()

routes.use("/users", users)
routes.use("/avatars", avatars)
routes.use("/sessions", sessions)
routes.use("/groups", groups)
routes.use("/swipes", swipes)

export default routes;
