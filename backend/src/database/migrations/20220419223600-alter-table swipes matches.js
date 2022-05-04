'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('swipes', 'matches', {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('matches', 'swipes', {});
  }
};
