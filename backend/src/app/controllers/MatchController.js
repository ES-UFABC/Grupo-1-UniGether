const container = require('../../shared/container.js');
const { User } = require('../models/Users.js');
const { Matches } = require('../models/Matches.js');
const { AppError } = require('../../errors/AppError.js');

const matchService = container.get("service.match");

class MatchController {

    async store(req, res) {

        let { user_id1, user_id2, status } = req.body;

        const user1 = await User.findByPk(user_id1);
        const user2 = await User.findByPk(user_id2);

        if (!user1 || !user2) {
            return res.status(400).json({ error: "Usuario não existe" })
        }

        const matchExists = await Matches.findOne({ where: { user_id1: user_id1, user_id2: user_id2 } })

        if (matchExists) {
            return res.status(400).json({ error: `Swipe já registrado.` })
        }

        await Matches.create(req.body);

        return res.json({
            message: "Swipe criado com sucesso",
            swipe: {
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

    async loadMatches(req, res) {
        const { user_id1 } = req.params;
        await Matches.sequelize.query(`select u.id,u.name,image_url from db_unigether.matches as m inner join db_unigether.users as u on m.user_id1 = u.id where user_id2=${user_id1} and status=1 and user_id1 in (select user_id2 from db_unigether.matches where user_id1=${user_id1} and status=1)`)
            .then((data) => res.status(200).json(data).send())
            .catch((error) =>
                res
                    .status(500)
                    .json({
                        message: error.message ||
                            `Erro interno na listagem de matches`,
                    })
            );
    }

    async findAllSwipes(req, res) {
        const { user_id1 } = req.params;
        const swipes = await Matches.findAll({ where: { user_id1: user_id1 } });
        if (swipes.length < 1) {
            throw new AppError("Não consta swipes");
        }
        return res.status(200).json(swipes).send();
    }
}

module.exports = MatchController;
