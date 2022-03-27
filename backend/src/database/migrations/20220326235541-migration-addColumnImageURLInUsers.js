'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => queryInterface.addColumn('users', 'imageUrl', { type: Sequelize.STRING(100), allowNull: false }),

    down: async(queryInterface, Sequelize) => queryInterface.removeColumn('users', 'imageUrl')
};