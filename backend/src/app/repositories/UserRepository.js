import User from "../models/Users";
import {Op} from 'sequelize'

class UserRepository{

    async insert(user) {
        return await User.create(user);
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

    async findByName(name) {
        let condition = {where: { name: {[Op.like]: `%${name}`}} };
        const users = await User.findAll(condition);
        return users;
    }
}

export {UserRepository}