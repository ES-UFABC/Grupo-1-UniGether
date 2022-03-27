import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../../errors/AppError";

class OutputUser{
    constructor(name, email,age,initial_year,gender,shift,bio,search_for){
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

class OutputUserCreate{
    constructor(id, name, email){
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

class OutputUserUpdate{
    constructor(id, name, email,age,initial_year,gender,shift,bio,search_for,oldPassword,password,confirmPassword,imageUrl){
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.initial_year= initial_year;
        this.gender = gender;
        this.shift = shift;
        this.bio = bio;
        this.search_for = search_for;
        this.oldPassword = oldPassword;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.imageUrl = imageUrl;
    }
}

class UserService{
    constructor(){
        this.repository = new UserRepository();
    }

    async listUser(userId){
        var user = await this.repository.getById(userId);
        if (!user) throw new AppError("Usuário não existe");
        const {id, name, email,age,initial_year,gender,shift,bio,search_for} = user;
        return new OutputUser(id, name, email,age,initial_year,gender,shift,bio,search_for);
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
        const url= request.file.filename;
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

        const {id, name, email,age,initial_year,gender,shift,bio,search_for,oldPassword,password,confirmPassword,imageUrl} = await this.repository.update(userId, inputUser);
        return new OutputUserUpdate(id, name, email,age,initial_year,gender,shift,bio,search_for,oldPassword,password,confirmPassword,imageUrl);
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
}

export {UserService};
