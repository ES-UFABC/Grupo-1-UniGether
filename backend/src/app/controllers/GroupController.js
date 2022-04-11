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

    async store(req, res) {

        const { user_id } = req.params;
        const { name, description } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: "Usuario não existe" })
        }

        const [group] = await Group.findOrCreate({
            where: { name, description }
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
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha ao validar.' });
        }

        const group = await Group.findByPk(req.params.id);

        const { name, description } = await group.update(req.body);

        return res.json({
            name,
            description
        });
    }

    async delete(req, res) {
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
}
export { GroupController };
