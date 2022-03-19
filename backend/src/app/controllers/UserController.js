import {UserValidator} from "../validators/UserValidator";
import {UserService} from "../services/UserService";
import { AppError } from "../../errors/AppError";

const userService = new UserService();
const userValidator = new UserValidator();

class UserController {

    async createUser(req, res) {

        const userIsValid = await userValidator.isValid(req.body);

        if (!userIsValid) {
            throw new AppError('Cadastro inválido, verifique os itens obrigatórios');
        }

        const outputUser = await userService.createUser(req.body);
        return res.json(outputUser).send();
 
    }

    async updateUser(req, res) {
        const userId = req.user.id;
        const inputUser = req.body;
        
        const userIsValid = await userValidator.isValid(inputUser);
        if (!userIsValid) {
            throw new AppError('Usuário inválido, verifique os itens obrigatórios');
        }

        const outputUser = await userService.updateUser(userId, inputUser);
        return res.json(outputUser).send();
    }

    async deleteUser(req, res) {
       const userId = req.user.id;
       await userService.deleteUser(userId);

       return res.status(200).json({message: "Usuario deletado"}).send()
    }
}
export {UserController};
