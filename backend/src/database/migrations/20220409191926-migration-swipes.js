'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('swipes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id1: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        OnUpdate: 'CASCADE',
        OnDelete: 'CASCADE',
        allowNull: false,
      },
      user_id2: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        OnUpdate: 'CASCADE',
        OnDelete: 'CASCADE',
        allowNull: false,
      },
      status: {
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
    return queryInterface.dropTable('swipes');
  },
};