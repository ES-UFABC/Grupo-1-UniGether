import Sequelize, { Model } from 'sequelize';

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

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'group_id', through: 'users-groups', as: 'users' });
    }
}

export default Group;
