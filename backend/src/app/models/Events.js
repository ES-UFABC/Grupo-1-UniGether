const { Sequelize, Model } = require('sequelize');

class Event extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            description: Sequelize.TEXT,
            type: Sequelize.ENUM("Online", "Presencial", "Hibrido"),
            address: Sequelize.STRING,
            start_date: Sequelize.DATE,
            end_date: Sequelize.DATE,
            closed: Sequelize.BOOLEAN
        },
            {
                sequelize,
            }
        );
        this.tableName = "events";
        return this;
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'event_id', through: 'users-events', as: 'users' });
    }
}

module.exports = Event;
