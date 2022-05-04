'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users-events', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                OnUpdate: 'CASCADE',
                OnDelete: 'CASCADE',
                allowNull: false,
            },
            event_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'events',
                    key: 'id',
                },
                OnUpdate: 'CASCADE',
                OnDelete: 'CASCADE',
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('users-events');
    },
};