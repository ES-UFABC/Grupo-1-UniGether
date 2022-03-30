import User from "../models/Users";
import {Op} from 'sequelize'

class UserRepository{

    async insert(user) {
        return await User.create(user);
    }

    async getById(id) {
        const user = await User.findByPk(id);
        return user;
    }

    async getByEmail(email) {
        const user = await User.findOne({where:{email: email}});;
        return user;
    }
    
    async getAll(){
        return User.findAll();
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

    async getName(name) {

        let condition = name ? { name: {[Op.like]: `%${name}%`}} : null;
        const users = await User.findAll({where: condition});
        return users;
    }
}

export {UserRepository}