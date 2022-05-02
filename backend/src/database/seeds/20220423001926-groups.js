'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('groups', [
      {
        name:"Economia Da Braba",
        description:"Só pra maluco",
        closed:true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"+18 Carnaval é todo dia",
        description:"...",
        closed:true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"Full Stack",
        description:"ou Full Stack Overflow?",
        closed:true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"Grupo Fechado",
        description:"FECHADO",
        closed:false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"Amizade",
        description:"Te vejo como amigx",
        closed:true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('groups', null, {})
  }
};
