import { Router } from "express";
import users from "./users.routes"
import sessions from "./session.routes"
import avatars from "./avatar.routes"
import groups from "./groups.routes"
import matches from "./matches.routes"
import messages from "./message.routes";
import images from "./image.routes";
import events from "./event.routes";

const routes = new Router()

routes.use("/users", users)
routes.use("/avatars", avatars)
routes.use("/sessions", sessions)
routes.use("/groups", groups)
routes.use("/matches", matches)
routes.use("/messages", messages)
routes.use("/events", events)
routes.use("/images", images)

export default routes;
