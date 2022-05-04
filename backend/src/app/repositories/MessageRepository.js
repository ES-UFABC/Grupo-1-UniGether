const Message = require("../models/Messages.js");
const { Op } = require("sequelize");

class MessageRepository {

    async findAllMessagesByGroupID(groupId){
        const messages = await Message.findAll({
            where:{
                group_id: groupId
            }
        })
        return messages
    }

    async findAllMessagesByGroupIDAfterDate(groupId, date){
        const messages = await Message.findAll({
            where:{
                group_id: groupId,
                [Op.and]: {
                    createdAt: {[Op.gte]: date}
                }
            }   
        })
        return messages
    }

    async updateMessage(messageId, newMessage){
        await Message.update(newMessage, { where:{ id : messageId } })
        return await Message.findByPk(messageId)
    }

    async deleteMessage(messageId){
        const message = await Message.findByPk(messageId)
        const deleted = await Message.destroy(message)
        if(deleted) return true
        return false
    }
}

module.exports = MessageRepository;