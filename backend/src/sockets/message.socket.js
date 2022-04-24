import { GroupRepository } from "../app/repositories/GroupRepository";
import { MatchRepository } from "../app/repositories/MatchRepository";
import { UserRepository } from "../app/repositories/UserRepository"

const userRepository = new UserRepository();
const groupRepository = new GroupRepository();
const matchRepository = new MatchRepository();

// Colocar na message service
const canSendMessage = async (userId, receiverId) => {
    userGroup = await groupRepository.getGroupByIdForUserId(userId, receiverId);
    userMatch = await matchRepository.getMatchByIdForUserId(userId, receiverId);

    if(userGroup === userMatch === null) return false;
    return true;
}

class OuputMessage {
    constructor(user, message) {
        this.user = user;
        this.message = message;
    }
}

const messageHandler = async (io, socket) => {
    const createMessage = async (payload) => {
        const output = new OuputMessage(payload.user, payload.message);
        io.in(payload.receiverId).emit("message:created", output);
    }

    const updateMessage = async (payload) => {
        const output = new OuputMessage(payload.user, payload.message);
        io.in(payload.receiverId).emit("message:updated",output);
    }

    const deleteMessage = async (payload) => {
        const output = new OuputMessage(payload.user, null);
        io.in(payload.receiverId).emit("message:deleted", output);
    }

    socket.on("message:create", createMessage);
    socket.on("message:update", updateMessage);
    socket.on("message:delete", deleteMessage);
}   

export default messageHandler;
