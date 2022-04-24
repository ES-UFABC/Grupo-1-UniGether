import container from '../../shared/container';
import User from '../models/Users';
import Matches from '../models/Matches';

const matchService = container.get("service.match");

class MatchController {

    async store(req, res) {
        
        let { user_id1, user_id2, status } = req.body;

        const user1 = await User.findByPk(user_id1);
        const user2 = await User.findByPk(user_id2);

        const matchExists = await Matches.findOne({ where: { id: id } })

        if (matchExists) {
            return res.status(400).json({ error: `Match já registrado.` })
        }

        if (!user1 || !user2) {
            return res.status(400).json({ error: "Usuario não existe" })
        }

        await Matches.create(req.body);

        return res.json({
            message: "Match criado com sucesso",
            swipe: {
                id,
                user_id1,
                user_id2,
                status
            }
        })

    }

    async delete(req, res) {
        try {
            const match = await Matches.findByPk(req.params.id);

            await match.destroy();

            return res.status(200).json({ message: `Match ${req.params.id} foi deletado` });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async loadMatches(req,res){
        const { user_id1, user_id2 } = req.params;
        await Matches.sequelize.query(`SELECT s2.id, s1.user_id2 FROM db_unigether.matches as s1 INNER JOIN db_unigether.matches as s2 ON s2.user_id1 = s1.user_id2 AND s2.user_id1 = ${user_id1} WHERE s1.user_id2 = ${user_id2}`)
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res
                    .status(500)
                    .json({
                        message: error.message ||
                            `Erro interno na listagem de matches`,
                    })
            );
    }
}
export { MatchController };
