import jwt from 'jsonwebtoken';

import User from '../models/Users';
import authConfig from '../../config/auth';


class SessionController {
    async store(request, response) {
        const { email, password } = request.body;

        const user = await User.findOne({ where: { email } } );

        if (!user) {
            return response.status(401).json({ error: 'Usuário não existe' });
        }

        if (!(await user.checkPassword(password))) {
            return response.status(401).json({ error: 'Senha não confere'});
        }

        const { id, name} = user;

        return response.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        })
    }
}


export default new SessionController();