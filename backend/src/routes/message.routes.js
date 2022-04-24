import { Router } from "express";
import { MessageController } from "../app/controllers/MessageController";
import { ensureAuthenticated } from "../middlewares/authentication";

const messageController = new MessageController(); 
const messages = new Router();

/*messages.get("/:groupId",ensureAuthenticated, messageController.getMessages);
messages.get("/:groupId/date=?date/offset=?offset", ensureAuthenticated, messageController.getMessagesAfterDate);*/

export default messages;
