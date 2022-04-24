import jwt from 'jsonwebtoken';
import container from '../../shared/container';

const userRepository = container.get("repository.user");

class SessionOutput{
    constructor(outputUser, token){
        this.outputUser = outputUser;
        this.token = token;
    }
}

class SessionController {
    async getSession(request, response) {
        const { email, password } = request.body;

        const user = await userRepository.findByEmail(email);

        if (!user) {
            return response.status(401).json({ error: 'Usuário não existe' });
        }

        if (!(await user.checkPassword(password))) {
            return response.status(401).json({ error: 'Senha não confere'});
        }

        const {id, name} = user;
        const token = jwt.sign(
            { id,name, email}, 
            "d0dcb7b225d9a93c5cc3aa93ddc2dd88aa563e0d", {
            expiresIn: "2d",
        });

        return response.json(new SessionOutput({id, name, email}, token))
    }
}


export {SessionController};
