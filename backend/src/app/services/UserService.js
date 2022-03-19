import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../../errors/AppError";

class OutputUser{
    constructor(id, name, email, phone){
        this.id = id;
        this.name = name;
        this.email = email
        this.phone = phone;
    }
}

class UserService{
    constructor(){
        this.repository = new UserRepository();
    }

    async createUser(inputUser){
        const userExists = await this.repository.getByEmail(inputUser.email); 
        if (userExists) throw new AppError("Usuário já existe");

        const {id, name, email, phone} = await this.repository.insert(inputUser);
        return new OutputUser(id, name, email, phone);
    }

    async updateUser(userId, inputUser){
        const userExists = await this.repository.getById(userId);
        if (!userExists) throw new AppError("Usuário não existe");

        const {id, name, email, phone} = await this.repository.update(userId, inputUser);
        return new OutputUser(id, name, email, phone);
    }

    async deleteUser(userId){
        const userExists = await this.repository.getById(userId);
        if (!userExists) throw new AppError("Usuário não existe");

        const userDeleted = await this.repository.delete(userId);
        if(!userDeleted) throw new AppError("Não foi possivel deletar o usuario");
    }
}

export {UserService};
