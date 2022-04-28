import Matches from "../models/Matches"
import { Sequelize, Op } from "sequelize"

class MatchRepository {
    async insert(match) {
        return await Matches.create(match)
    }

    async getAllMatchsByUserId(userId) {
        const matchs = await Matches.findAll({
            where: {
                user_id1: userId,
                status: true,
                [Op.and]: Sequelize.literal(`exists (
                                            select 1 from matches
                                                 where user_id2 = ${userId}) && status = true`)
            }
        })
        return matchs;
    }

}

export { MatchRepository }