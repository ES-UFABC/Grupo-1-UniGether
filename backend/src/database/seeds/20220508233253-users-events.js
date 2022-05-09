'use strict'

class Register{
  constructor(user_id, event_id, created_at, updated_at){
    this.user_id = user_id;
    this.event_id = event_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query("select id from users;");
    const events = await queryInterface.sequelize.query("select id from events;");
    const registers = [];
    users[0].forEach(
      u => events[0].forEach(
        g => {
          if(Math.random() > 0.4){
            registers.push(new Register(u.id, g.id, new Date(), new Date()));
          }
        })
    );

    await queryInterface.bulkInsert('users-events',registers, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users-events', null, {})
  }
};
