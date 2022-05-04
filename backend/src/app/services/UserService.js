const { AppError } = require("../../errors/AppError.js");
const { deleteFile } = require("../../utils/file.js");
const bcrypt = require("bcryptjs");

class OutputUser {
    constructor(id, name, university, course, email, age, initial_year, gender, shift, bio, search_for, image_url) {
        this.id = id;
        this.name = name;
        this.university = university;
        this.course = course;
        this.email = email;
        this.age = age;
        this.initial_year = initial_year;
        this.gender = gender;
        this.shift = shift;
        this.bio = bio;
        this.search_for = search_for;
        this.image_url = image_url;
    }
}

class OutputUserCreate {
    constructor(id, name, email, university, course) {
        this.id = id;
        this.name = name;
        this.university = university;
        this.course = course;
        this.email = email;
    }
}

class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    async getUserById(userId) {
        var user = await this.repository.findById(userId);
        if (!user) throw new AppError("Usuário não existe");
        const { id, name, university, course, email, age, initial_year, gender, shift, bio, search_for } = user;
        return new OutputUser(id, name, university, course, email, age, initial_year, gender, shift, bio, search_for);
    }

    async getAllUsers() {
        var users = await this.repository.findAll();
        if (users.length < 1) {
            return res.json({ message: "Nenhum usuário foi cadastrado." });
        }
        return users;
    }

    async createUser(inputUser) {
        const userExists = await this.repository.findByEmail(inputUser.email);
        if (userExists) throw new AppError("Usuário já existe");

        const { id, name, email, university, course } = await this.repository.insert(inputUser);
        return new OutputUserCreate(id, name, email, university, course);
    }

    async updateUser(userId, inputUser) {
        const user = await this.repository.findById(userId);
        if (!user) throw new AppError("Usuário não existe");

        if (inputUser.email && inputUser.email != user.email) {
            const emailsExists = await this.repository.getByEmail(user.email)

            if (emailsExists) {
                throw new AppError("Usuário já existe");
            }
        }

        if (inputUser.oldPassword && !(await user.checkPassword(inputUser.oldPassword))) {
            throw new AppError("Senha não corresponde");
        }

        inputUser.password_hash = await bcrypt.hash(inputUser.password, 8);
        const { id, name, university, course, email, age, initial_year, gender, shift, bio, search_for } = await this.repository.update(userId, inputUser);

        return new OutputUser(id, name, university, course, email, age, initial_year, gender, shift, bio, search_for);
    }

    async deleteUser(userId) {
        const userExists = await this.repository.findById(userId);
        if (!userExists) throw new AppError("Usuário não existe");

        const userDeleted = await this.repository.delete(userId);
        if (!userDeleted) throw new AppError("Não foi possivel deletar o usuario");
    }

    async getUsersByName(name) {
        var users = await this.repository.findByName(name);
        if (!users) throw new AppError("Não consta usuários com esse nome");
        return users.map(u => new OutputUser(u));
    }

    async addAvatar(userId, path) {
        var user = await this.repository.findById(userId);
        if (!user) throw new AppError("Usuário não existe");
        if (user.image_url) {
            await deleteFile("./tmp/avatar/" + path);
        }

        await this.repository.update(userId, { image_url: path });
    }

    async getAvatarByUserId(userId) {
        var user = await this.repository.findById(userId);
        if (!user) throw new AppError("Usuário não existe");

        return user.image_url;
    }
}

module.exports = UserService;
