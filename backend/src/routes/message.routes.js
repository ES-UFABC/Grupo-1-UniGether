const { Router } = require("express");
const MessageController = require("../app/controllers/MessageController.js");
const { ensureAuthenticated } = require("../middlewares/authentication.js");

const messageController = new MessageController(); 
const messages = new Router();

messages.get("/:groupId",ensureAuthenticated, messageController.getMessages);
//messages.get("/:groupId/date=?date/offset=?offset", ensureAuthenticated, messageController.getMessagesAfterDate);*/

module.exports = messages;

