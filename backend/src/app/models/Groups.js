import Sequelize, { Model } from 'sequelize';

class Group extends Model {
    static init(sequelize) {
        super.init({
            id: Sequelize.INTEGER,
            user_id: Sequelize.INTEGER,
            name: Sequelize.STRING,
            description: Sequelize.TEXT,
        },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Group;

WorkingDay.associate = function (models) {
    WorkingDay.belongsToMany(models.User, { through: 'UsersWorkingDays', foreignKey: 'workingDayId', as: 'employes' })
};