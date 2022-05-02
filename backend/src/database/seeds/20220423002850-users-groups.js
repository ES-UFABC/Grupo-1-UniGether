'use strict'

class Register{
  constructor(user_id, group_id, created_at, updated_at){
    this.user_id = user_id;
    this.group_id = group_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query("select id from users;");
    const groups = await queryInterface.sequelize.query("select id from groups;");
    const registers = [];
    users[0].forEach(
      u => groups[0].forEach(
        g => {
          if(Math.random() > 0.4){
            registers.push(new Register(u.id, g.id, new Date(), new Date()));
          }
        })
    );

    await queryInterface.bulkInsert('users-groups',registers, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users-groups', null, {})
  }
};
