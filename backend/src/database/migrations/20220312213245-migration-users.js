'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        initialYear: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull:true,
        },
        shift: {
          type: Sequelize.ENUM("Matutino","Noturno"),
          allowNull:false,
        },
        contacts:{
          type: Sequelize.STRING,
          allowNull:true,
        },
        bio:{
          type: Sequelize.TEXT,
          allowNull:true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING,
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

  down:  (queryInterface) => {
     return queryInterface.dropTable('users');     
  },
};