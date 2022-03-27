import {UserValidator} from "../validators/UserValidator";
import {UserService} from "../services/UserService";
import { AppError } from "../../errors/AppError";

const userService = new UserService();
const userValidator = new UserValidator();

class UserController {

    async index(req, res) {
        var outputUsers = await userService.listUsers();
        return res.status(200).json(outputUsers).send();
    }

    async indexUser(req, res) {
        const userId = req.params.id;   
        var outputUser = await userService.listUser(userId);
        return res.status(200).json(outputUser).send();
    }

    async create(req, res) {

        const userIsValid = await userValidator.isValidCreate(req.body);

        if (!userIsValid) {
            throw new AppError('Cadastro inválido, verifique os itens obrigatórios');
        }

        const outputUser = await userService.createUser(req.body);
        return res.status(200).json(outputUser).send();
 
    }

    async update(req, res) {
        const userId = req.user.id;
        const inputUser = req.body;
        
        const userIsValid = await userValidator.isValidUpdate(inputUser);
        if (!userIsValid) {
            throw new AppError('Usuário inválido, verifique os itens obrigatórios');
        }

        const outputUser = await userService.updateUser(userId, inputUser);
        return res.status(200).json(outputUser).send();
    }

    async delete(req, res) {
       const userId = req.user.id;
       await userService.deleteUser(userId);

       return res.status(200).json({message: "Usuario deletado"}).send();
    }

    async findByName(req,res){
        const name = req.query.name;
        var outputUsers = await userService.getName(name);
        return res.status(200).json(outputUsers).send();
    }
}
export {UserController};
