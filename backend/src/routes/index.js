import { Router } from "express";
import users  from "./users.routes"
import sessions from "./session.routes"

const routes = new Router()

routes.use("/users", users)
routes.use("/sessions", sessions)

export default routes