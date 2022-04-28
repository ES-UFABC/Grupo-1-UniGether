import Sequelize, { Model } from 'sequelize';

class Event extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            description: Sequelize.TEXT,
            type: Sequelize.ENUM("Online", "Presencial", "Hibrido"),
            address: Sequelize.STRING,
            startDate: Sequelize.DATE,
            endDate: Sequelize.DATE,
            closed: Sequelize.BOOLEAN
        },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'event_id', through: 'users-events', as: 'users' });
    }
}

export default Event;
