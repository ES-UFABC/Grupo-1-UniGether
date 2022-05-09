'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('events', [
      {
        name:"Economia Da Braba",
        description:"Só pra maluco",
        address:"rua dos avarentos",
        closed:true,
        type:"Online",
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"+18 Carnaval é todo dia",
        description:"...",
        address:"rua dos vagabundos",
        closed:true,
        type:"Online",
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"Full Stack",
        description:"ou Full Stack Overflow?",
        address:"rua dos complicados",
        closed:true,
        type:"Online",
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
        
      },
      {
        name:"Grupo Fechado",
        description:"FECHADO",
        address:"rua fechada",
        closed:true,
        type:"Online",
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:"Amizade",
        description:"Te vejo como amigx",
        address:"rua das amizade",
        closed:true,
        type:"Online",
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {})
  }
};
