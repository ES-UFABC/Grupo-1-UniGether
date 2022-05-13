const container = require('../../shared/container.js');
const { User } = require('../models/Users.js');
const { Group } = require('../models/Groups.js');
const { AppError } = require('../../errors/AppError.js');
const Yup = require('yup');

const groupService = container.get("service.group");

class GroupController {

    async findUserGroups(req, res) {
        const { user_id } = req.params;
        const groups = await groupService.getUserGroups(user_id);
        return res.json(groups)
    }

    async findAllGroupsOpen(req, res) {
        const groups = await groupService.getAllOpenGroups();
        return res.status(200).json(groups);
    }

    async addUserInGroup(req, res) {
        const { user_id, id } = req.params;

        await groupService.addUserInGroup(user_id, id);
        const group = await groupService.getGroupById(id);

        return res.status(200).json(group);
    }

    async createGroup(req, res) {
        const user_id = req.user.id;
        const { name, description, closed } = req.body;

        const group = await groupService.createGroup(user_id, { name, description, closed });
        return res.json(group);
    }

    async getGroupById(req, res) {
        const group = await groupService.getGroupById(req.params.id);
        return res.status(200).json(group);
    }

    async updateGroup(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
            closed: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('Falha ao validar.');
        }

        const group = await groupService.updateGroup(req.params.id, req.body);
        return res.json(group);
    }

    async removeUser(req, res) {
        const { id, user_id } = req.params;
        await groupService.removeUserFromGroup(user_id, id);
        return res.status(200).json();
    }

    async delete(req, res) {
        try {
            const group = await Group.findByPk(req.params.id);

            await group.destroy();

            return res.status(200).json({ message: `Grupo ${req.params.id} foi deletado` });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = GroupController;
