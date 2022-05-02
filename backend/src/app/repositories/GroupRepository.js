const Group = require("../models/Groups.js");
const { Op } = require('sequelize')

class GroupRepository {
    async insert(group) {
        return await Group.create(group);
    }

    async findById(id) {
        const group = await Group.findByPk(id);
        return group;
    }

    async findAll() {
        return Group.findAll();
    }

    async findAllOpen(user_id) {
        return Group.findAll({
            where: {
                closed: false, [Op.ne]: {
                    user_id: user_id
                }
            }
        });
    }

    async findAllUserGroups(user_id) {
        await Group.findAll({ where: { user_id: user_id } });
    }

    async update(id, newGroup) {
        await Group.update(newGroup, { where: { id: id } });
        return await Group.findByPk(id);
    }

    async delete(id) {
        const group = await Group.findByPk(id);
        const groupIsDeleted = group.destroy().then(_ => true).catch(_ => false);
        return groupIsDeleted;
    }
}

module.exports =  GroupRepository;
