const { Sequelize, Model } = require('sequelize');

class Group extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            description: Sequelize.TEXT,
            closed: Sequelize.BOOLEAN
        },
            {
                sequelize,
            }
        );
        this.tableName = "groups";
        return this;
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'group_id', through: 'users-groups', as: 'users' });
    }
}

module.exports = Group;
