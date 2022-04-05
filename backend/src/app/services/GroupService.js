import { GroupRepository } from "../repositories/GroupRepository";
import { AppError } from "../../errors/AppError";

class GroupService {
    constructor() {
        this.repository = new GroupRepository();
    }

    async listGroups() {
        var groups = await this.repository.getAll();
        if (groups.length < 1) {
            return res.json({ message: "Nenhum grupo foi cadastrado." });
        }
        return groups;
    }

    async createGroup(inputGroup) {
    }

    async updateGroup(groupId, inputGroup) {

    }

    async deleteGroup(userId) {
    }
}

export { GroupService };