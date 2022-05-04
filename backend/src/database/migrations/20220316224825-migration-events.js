'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('events', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            type: {
                type: Sequelize.ENUM("Online", "Presencial, Hibrido"),
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
            closed: {
                type: Sequelize.BOOLEAN,
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
        return queryInterface.dropTable('events');
    },
};