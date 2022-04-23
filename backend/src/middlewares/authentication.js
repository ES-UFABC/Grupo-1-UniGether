import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";
import container from "../shared/container";

const userRepository =  container.get("repository.user");

async function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("Token faltando", 401);

    const [, token] = authHeader.split(" ");
    try {

        const { id } = verify(
            token,
            "d0dcb7b225d9a93c5cc3aa93ddc2dd88aa563e0d"
        );

        const user = await userRepository.findById(id);
        if (!user) throw new AppError("Usuário não existe", 401);

        request.user = {
            id: id,
        };

        next();
    } catch {
        throw new AppError("Token invalido", 401);
    }
}

export { ensureAuthenticated };
