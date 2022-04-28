'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('posts', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
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
                allowNull: true,
            },
            content: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('posts');
    },
};