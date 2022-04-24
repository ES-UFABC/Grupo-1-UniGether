import Sequelize, { Model } from 'sequelize';

class Message extends Model {
    static init(sequelize) {
        super.init({
            message: Sequelize.TEXT,

        },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'sender' });
        this.belongsTo(models.Group, { foreignKey: 'group_id', as: 'receiver' });
    }
}

export default Message;