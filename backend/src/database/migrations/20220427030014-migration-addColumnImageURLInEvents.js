'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('events', 'image_url', { type: Sequelize.STRING(100), allowNull: true }),

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn('events', 'image_Url')
};