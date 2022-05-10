const User = require("../models/Users.js");
const { Op } = require('sequelize');

class UserRepository{

    async insert(user) {
        const newUser = await User.create(user);
        return newUser;
    }

    async findById(id) {
        const user = await User.findByPk(id);
        return user;
    }

    async findByEmail(email) {
        const user = await User.findOne({where:{email: email}});;
        return user;
    }
    
    async findAll(){
        return await User.findAll();
    }

    async update(id, newUser){
        await User.update(newUser, {where:{id: id}});
        return await User.findByPk(id);
    }

    async delete(id){
        const user = await User.findByPk(id);
        const userIsDeleted = user.destroy().then(_ => true).catch(_ => false);
        return userIsDeleted;
    }

    async findByName(name) {
        let condition = {where: { name: {[Op.like]: `%${name}`}} };
        const users = await User.findAll(condition);
        return users;
    }
}

module.exports = UserRepository;