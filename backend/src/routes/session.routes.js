import { Router } from "express"
import { SessionController } from "../app/controllers/SessionController"

const sessions = new Router();
const sessionController = new SessionController();

sessions.post("/", sessionController.getSession)

export default sessions