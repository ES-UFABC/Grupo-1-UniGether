require("../../../database/index.js");
const container = require('../../../shared/container.js')
const repository = container.get("repository.user");


describe('UserRepository', () => {

    const mockUser = {
        name: "Guilherme Rocha Muzi Franco",
        university: "Universidade Federal dos Cornos",
        course: "Engenharia da computação",
        email: "muzi.fraco@aluno.ufabc.edu.br",
        password: "abcdefg",
    };

    it('When save user should return user', async () => {
        const user = await repository.insert(mockUser);
        const result = {};
        Object.keys(user).forEach(key => {
            if(mockUser.hasOwnProperty(key)) result.key = user.key;
        });

        expect(user).toEqual(mockUser);
    });

    it('Search user by id should be return user', async () => {

    })

    it('Search all users should be return all users', async () => {

    })

    it('Search user by name should be return all users', async () => {

    })

    it('Update user should be return updated user', async () => {

    })

    it('Delete user should be return delete result', async () => {

    })
});