import { UserValidator } from "../validators/UserValidator";
import container from "../../shared/container";
import { AppError } from "../../errors/AppError";
import path from "path";

const userService = container.get("service.user");
const userValidator = new UserValidator();

class UserController {

    async getUsers(req, res) {
        var outputUsers = await userService.getAllUsers();
        return res.status(200).json(outputUsers).send();
    }

    async getUserById(req, res) {
        const userId = req.params.id;
        var outputUser = await userService.getUserById(userId);
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

        return res.status(200).json({ message: "Usuario deletado" }).send();
    }

    async addAvatar(req, res) {
        const userId = req.user.id;
        const fileName = req.file.filename;
        await userService.addAvatar(userId, fileName);
        return res.status(200).json({ message: "Avatar adicionado ao usuario" }).send();
    }

    async getAvatar(req, res) {
        const userId = req.user.id;
        const fileName = await userService.getAvatar(userId);
        const avatarPath = path.resolve("tmp", "avatar", fileName);
        return res.sendFile(avatarPath);
    }

    async getAvatarById(req, res) {
        const userId = req.params.id;
        const fileName = await userService.getAvatar(userId);
        const avatarPath = path.resolve("tmp", "avatar", fileName);
        return res.sendFile(avatarPath);
    }

    async getUsersByName(req, res) {
        const name = req.params.name;
        var outputUsers = await userService.getUsersByName(name);
        return res.status(200).json(outputUsers).send();
    }
}
export { UserController };
