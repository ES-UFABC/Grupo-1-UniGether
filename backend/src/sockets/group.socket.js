const container = require("../shared/container.js");

const groupRepository = container.get("repository.group");
const matchRepository = container.get("repository.match");


const canJoinGroup = async (userId, receiverId) => {
    userGroups = groupRepository.getAllByUserId()

}

const canJoinPrivateGroup = async (userId, receiverId) => {

}

const groupHandler = async (io, socket) => {

    const joinGroup = async (socket) => {
        socket.join(data.room);
        console.log(data.user + ' joined the room : ' + data.room);
    }

    const joinPrivateGroup = async (socket) => {
        socket.join(data.receiverId);
    }

    const leaveGroup = (socket) => {
        socket.leave(data.room);
    }

    socket.on("group:join", joinGroup);
    socket.on("group:leave", leaveGroup);
    socket.on("private-group:join", joinPrivateGroup);
}

module.exports = groupHandler;