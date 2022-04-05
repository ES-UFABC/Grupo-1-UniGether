import Group from "../models/Groups";

class GroupRepository {
    async insert(group) {
        return await Group.create(group);
    }

    async getById(id) {
        const group = await Group.findByPk(id);
        return group;
    }

    async getAll() {
        return Group.findAll();
    }

    async update(id, newGroup) {
        await Group.update(newGroup, { where: { id: id } });
        return await Group.findByPk(id);
    }

    async delete(id) {
        const group = await Group.findByPk(id);
        const groupIsDeleted = Group.destroy().then(_ => true).catch(_ => false);
        return groupIsDeleted;
    }
}

export { GroupRepository }