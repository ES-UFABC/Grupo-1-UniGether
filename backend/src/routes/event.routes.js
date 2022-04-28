import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import { EventController } from "../app/controllers/EventController";

const eventController = new EventController();
const events = new Router();

events.get("/:id", ensureAuthenticated, eventController.getEventById);
events.get("/user/:user_id", ensureAuthenticated, eventController.findUserEvents);
events.get("/", ensureAuthenticated, eventController.findAllEventsOpen);
events.post("/", ensureAuthenticated, eventController.createEvent);
events.post("/:id/user/:user_id", ensureAuthenticated, eventController.addUserInEvent);
events.put("/:id", ensureAuthenticated, eventController.updateEvent);
events.delete("/:id/user/:user_id", ensureAuthenticated, eventController.removeUser);
events.delete("/:id", ensureAuthenticated, eventController.delete);

export default events;