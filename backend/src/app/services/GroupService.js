const { AppError } = require("../../errors/AppError.js");

class OutputGroup {
    constructor(group){
        this.id = group.id;
        this.name = group.name;
        this.description = group.description;
        this.closed = group.closed;
    }
}

class GroupService {
    constructor(groupRepository, userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    async getGroupById(group_id){
        var group = await this.groupRepository.findById(group_id);
        if(!group) throw new AppError("O grupo não existe");
        return new OutputGroup(group);
    }

    async addUserInGroup(user_id, group_id){
        var user = await this.userRepository.findById(user_id);
        if (!user) throw new AppError("O usuario não existe");

        var group = await this.groupRepository.findById(group_id);
        if (!group) throw new AppError("O grupo não existe");

        await user.setGroups(group);
        return new OutputGroup(group);
    }

    async removeUserFromGroup(user_id, group_id){
        var user = await this.userRepository.findById(user_id);
        if (!user) throw new AppError("O usuario não existe");

        var group = await this.groupRepository.findById(group_id);
        if (!group) throw new AppError("O grupo não existe");

        await user.removeGroup(group);
    }

    async getUserGroups(user_id){
        const user = await this.userRepository.findById(user_id);
        if(!user) throw new AppError("O usuario não existe");
        const groups = await user.getGroups()
        return groups.map(g => new OutputGroup(g));
    }

    async getAllOpenGroups(user_id) {
        var groups = await this.groupRepository.findAllOpen(user_id);
        if (groups.length < 1) {
            throw new AppError("Nenhum grupo foi encontrado");
        }
        return groups.map(g => new OutputGroup(g));
    }

    async createGroup(user_id, inputGroup) {
        const user = await this.userRepository.findById(user_id);
        if (!user) throw new AppError("O usuario não existe");

        const group = await this.groupRepository.insert(inputGroup);
        if (!group) throw new AppError("fudeu, não criou");

        await user.addGroup(group);
        return new OutputGroup(group);
    }

    async updateGroup(group_id, inputGroup) {
        const group = await this.groupRepository.update(group_id, inputGroup);
        if(!group) throw new AppError("O grupo não foi atualizado");
        return new OutputGroup(group);
    }

    async deleteGroup(user_id) {
        const deleted = await this.groupRepository.delete(user_id);
        if(!deleted) throw new AppError("O grupo não foi deletado");
    }
}

module.exports = GroupService;
