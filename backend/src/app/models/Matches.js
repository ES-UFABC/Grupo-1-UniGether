const { Sequelize, Model } = require('sequelize');

class Matches extends Model {
    static init(sequelize) {
        super.init({
            status: Sequelize.BOOLEAN
        },
            {
                sequelize,
            }
        );
        this.tableName = "matches";
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id1', as: 'user1' });
        this.belongsTo(models.User, { foreignKey: 'user_id2', as: 'user2' });
    }
}

module.exports = Matches;
