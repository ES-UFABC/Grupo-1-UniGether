import User from '../models/Users';
import Swipe from '../models/Swipes';

class SwipeController {

    async store(req, res) {
        
        let { user_id1, user_id2, status } = req.body;

        const user1 = await User.findByPk(user_id1);
        const user2 = await User.findByPk(user_id2);

        const swipeExists = await Swipe.findOne({ where: { id: id } })

        if (swipeExists) {
            return res.status(400).json({ error: `Swipe já registrado.` })
        }

        if (!user1 || !user2) {
            return res.status(400).json({ error: "Usuario não existe" })
        }

        await Swipe.create(req.body);

        return res.json({
            message: "Swipe criado com sucesso",
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
            const swipe = await Swipe.findByPk(req.params.id);

            await swipe.destroy();

            return res.status(200).json({ message: `Swipe ${req.params.id} foi deletado` });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async loadMatches(req,res){
        const { user_id1, user_id2 } = req.params;
        await Swipe.sequelize.query(`SELECT s2.id, s1.user_id2 FROM db_unigether.swipe as s1 INNER JOIN db_unigether.swipe as s2 ON s2.user_id1 = s1.user_id2 AND s2.user_id1 = ${user_id1} WHERE s1.user_id2 =  ${user_id2}`)
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
export { SwipeController };
