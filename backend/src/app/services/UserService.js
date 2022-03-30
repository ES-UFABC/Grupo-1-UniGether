import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../../errors/AppError";
import { deleteFile } from "../../utils/file";
import bcrypt from "bcryptjs";

class OutputUser{
    constructor(name, email,age,initial_year,gender,shift,bio,search_for,image_url){
        this.name = name;
        this.email = email;
        this.age = age;
        this.initial_year= initial_year;
        this.gender = gender;
        this.shift = shift;
        this.bio = bio;
        this.search_for = search_for;
        this.image_url=image_url;
    }
}

class OutputUserCreate{
    constructor(id, name, email){
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

class OutputUserUpdate{
    constructor(id, name, email,age,initial_year,gender,shift,bio,search_for){
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.initial_year= initial_year;
        this.gender = gender;
        this.shift = shift;
        this.bio = bio;
        this.search_for = search_for;
    }
}

class UserService{
    constructor(){
        this.repository = new UserRepository();
    }

    async listUser(userId){
        var user = await this.repository.getById(userId);
        if (!user) throw new AppError("Usuário não existe");
        const {id, name, email,age,initial_year,gender,shift,bio,search_for,image_url} = user;
        return new OutputUser(id, name, email,age,initial_year,gender,shift,bio,search_for,image_url);
    }

    async listUsers(){
        var users = await this.repository.getAll();
        if (users.length < 1){
            return res.json({ message: "Nenhum usuário foi cadastrado." });
        }
        return users;
    }

    async createUser(inputUser){
        const userExists = await this.repository.getByEmail(inputUser.email); 
        if (userExists) throw new AppError("Usuário já existe");

        const {id, name, email} = await this.repository.insert(inputUser);
        return new OutputUserCreate(id, name, email);
    }

    async updateUser(userId, inputUser){
        const user = await this.repository.getById(userId);
        if (!user) throw new AppError("Usuário não existe");

        if(inputUser.email && inputUser.email != user.email){
            const emailsExists = await this.repository.getByEmail(user.email)
            
            if(emailsExists){
                throw new AppError("Usuário já existe");
            }
        }

        if(inputUser.oldPassword && !(await user.checkPassword(inputUser.oldPassword))){
            throw new AppError("Senha não corresponde");
        }

        inputUser.password_hash = await bcrypt.hash(inputUser.password, 8);
        const {id, name, email,age,initial_year,gender,shift,bio,search_for} = await this.repository.update(userId, inputUser);
        
        return new OutputUserUpdate(id, name, email,age,initial_year,gender,shift,bio,search_for);
    }

    async deleteUser(userId){
        const userExists = await this.repository.getById(userId);
        if (!userExists) throw new AppError("Usuário não existe");

        const userDeleted = await this.repository.delete(userId);
        if(!userDeleted) throw new AppError("Não foi possivel deletar o usuario");
    }

    async getName(name){
        var users = await this.repository.getName(name);
        if(!users) throw new AppError("Não consta usuários com esse nome");
    }

    async addAvatar(userId, path){
        var user = await this.repository.getById(userId);
        if(!user) throw new AppError("Usuário não existe");
        if(user.image_url){
            await deleteFile("./tmp/avatar/" + path);
            throw new AppError("Usuário já tem um avatar");
        }

        await this.repository.update(userId, {image_url: path});
    }

    async getAvatar(userId){
        var user = await this.repository.getById(userId);
        if(!user) throw new AppError("Usuário não existe");

        return user.image_url;
    }
}

export {UserService};
