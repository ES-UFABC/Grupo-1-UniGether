import { GroupService } from "../services/GroupService";
import User from '../models/Users';
import Group from '../models/Groups';

const groupService = new GroupService();

class GroupController {

    async index(req, res) {
        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {
            include: { association: 'groups' }
        })

        return res.json(user.groups)

    }

    async findAllGroups(req, res) {
        const groups = await Group.findAll({ where: null });
        if (groups.length < 1)
            return res.json({ message: "Nenhum grupo foi cadastrado." });
        return res.json(groups);
    }

    async findAllGroupsOpen(req, res) {
        await Group.findAll({ where: { closed: false } })
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res.status(500).json({
                    message: error.message || "Erro ao listar grupos abertos.",
                })
            );
    }

    async insertUsers(req, res) {
        const { user_id, id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: "Usuario não existe" })
        }

        const [group] = await Group.findOrCreate({
            where: { id }
        });

        await user.setGroups(group)

        return res.json(group);
    }

    async store(req, res) {

        const { user_id } = req.params;
        const { name, description, closed } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: "Usuario não existe" })
        }

        const [group] = await Group.findOrCreate({
            where: { name, description, closed }
        });

        await user.addGroup(group);

        return res.json(group);
    }

    async findGroupById(req, res) {
        const group = await Group.findOne({ where: { id: req.params.id } });

        if (!group) {
            return res.status(400).json({ error: "Grupo não encontrado!" });
        }

        return res.status(200).json(group);
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
            closed: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha ao validar.' });
        }

        const group = await Group.findByPk(req.params.id);

        const { name, description, closed } = await group.update(req.body);

        return res.json({
            name,
            description,
            closed
        });
    }

    async deleteByUser(req, res) {
        const { user_id, id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: "Usuario não existe" })
        }

        const group = await Group.findOne({
            where: { id }
        });

        await user.removeGroup(group);
        return res.json();
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
export { GroupController };
