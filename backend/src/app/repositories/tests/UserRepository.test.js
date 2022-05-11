const sequelize = require("../../../database/index.js");
const container = require('../../../shared/container.js');
const User = require("../../models/Users.js");
const repository = container.get("repository.user");
const filterIfKeyExist = require("./helper.js");

beforeAll(async () => await sequelize.sync({force: true}));
beforeEach(async () => await User.sync({force: true}) );

describe('UserRepository', () => {

    const mockUser = {
        name: "Guilherme Rocha Muzi Franco",
        university: "Universidade Federal dos Cornos",
        course: "Engenharia da computação",
        email: "muzi.fraco@aluno.ufabc.edu.br",
        password: "abcdefg"
    };

    it('When save user should return user', async () => {
        const user = await repository.insert(mockUser);

        expect(mockUser).toEqual(filterIfKeyExist(user, mockUser));
    });

    it('Search user by id should be return user', async () => {
        await repository.insert(mockUser);

        const user = await repository.findById(1);

        expect(user.checkPassword(mockUser.password)).toBeTruthy();
        
        const expectUser = {
            name: mockUser.name,
            university: mockUser.university,
            course: mockUser.course,
            email: mockUser.email,
        };

        expect(expectUser).toEqual(filterIfKeyExist(user, mockUser));
    })

    it('Search all users should be return all users', async () => {
        const userOne = {
            name: "Thomas Paixão",
            university: "Universidade Federal do Rio Grande do Sul",
            course: "filosofia",
            email: "paixao.thomas@aluno.ufrgs.edu.br",
            password: "12345"
        };
        
        const userTwo = {
            name: "Eric Soares",
            university: "Universidade Federal de São Paulo",
            course: "odontologia",
            email: "soares@aluno.usp.edu.br",
            password: "12345abcd"
        };

        const users = [mockUser, userOne, userTwo];
        for(i = 0; i < users.length; i++){
            await repository.insert(users[i]);
            delete users[i].password;
        }

        const rawUsers = await repository.findAll();
       
        const expectedUsers = rawUsers.map(u => filterIfKeyExist(u, users[0]));

        expect(users).toEqual(expectedUsers);
    })

    it('Search user by name should be return all users', async () => {
        const userOne = {
            name: "João Fulano",
            university: "Universidade Federal do Rio Grande do Sul",
            course: "filosofia",
            email: "joao.fulano@aluno.ufrgs.edu.br",
            password: "12345"
        };
        
        const userTwo = {
            name: "Joana Soares",
            university: "Universidade Federal de São Paulo",
            course: "odontologia",
            email: "joana@aluno.usp.edu.br",
            password: "12345abcd"
        };

        const users = [mockUser, userOne, userTwo];
        for(i = 0; i < users.length; i++){
            await repository.insert(users[i]);
            delete users[i].password;
        }

        users.shift();

        const rawUsers = await repository.findByName("Jo");

        const expectedUsers = rawUsers.map(u => filterIfKeyExist(u, users[0]));

        expect(users).toEqual(expectedUsers);
    })

    it('Update user should be return updated user', async () => {
        const userToUpdated = {
            name: "Guilherme Rocha Musi Franco",
            university: "Universidade Federal dos Cornos",
            course: "filosofia",
            email: "muzi.fraco@aluno.ufabc.edu.br",
            password: "abcdefg"
        };

        const user = await repository.insert(mockUser);

        expect(mockUser).toEqual(filterIfKeyExist(user, mockUser));

        const userUpdateded = await repository.update(1, userToUpdated);

        delete userToUpdated.password;

        expect(userToUpdated).toEqual(filterIfKeyExist(userUpdateded, userToUpdated));
    })

    it('Delete user should be return delete result', async () => {
        const user = await repository.insert(mockUser);
        const deleted = await repository.delete(user.dataValues.id);

        expect(deleted).toBeTruthy();
    })
});