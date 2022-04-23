'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name:"Guilherme",
        university:"UFABC",
        course:"Economia",
        email:"gui@gmail.com",
        password_hash: "$2a$08$e2ZAhxeSqBLblIQWF9VpK.jZBe84G3IySsbKdynC7kWce99qjhBEm",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"Igor",
        university:"USP",
        course:"Ciencia da Computacao",
        email:"igor@hotmail.com",
        password_hash: "$2a$08$e2ZAhxeSqBLblIQWF9VpK.jZBe84G3IySsbKdynC7kWce99qjhBEm",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"Beatriz",
        university:"UFRJ",
        course:"Matematica",
        email:"bea@gmail.com",
        password_hash: "$2a$08$e2ZAhxeSqBLblIQWF9VpK.jZBe84G3IySsbKdynC7kWce99qjhBEm",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"Paloma",
        university:"UFABC",
        course:"Ciencia da Computacao",
        email:"paloma@gmail.com",
        password_hash: "$2a$08$e2ZAhxeSqBLblIQWF9VpK.jZBe84G3IySsbKdynC7kWce99qjhBEm",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"Thales",
        university:"UFSCAR",
        course:"Filosofia",
        email:"thales@gmail.com",
        password_hash: "$2a$08$e2ZAhxeSqBLblIQWF9VpK.jZBe84G3IySsbKdynC7kWce99qjhBEm",
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
