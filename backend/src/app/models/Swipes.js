import Sequelize, { Model } from 'sequelize';

class Swipe extends Model {
    static init(sequelize) {
        super.init({
            status: Sequelize.BOOLEAN
        },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id1', as: 'user1' });
        this.belongsTo(models.User, { foreignKey: 'user_id2', as: 'user2' });
    }
}

export default Swipe;
