import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '~/helpers/api-errors';
import { extractTokenWithScheme, validateAuthToken } from '~/helpers/auth';
import { Usuario } from '~/indexes/index-models';

const { sequelize } = Usuario;

export async function generateAuthorizationData(token: string | null) {
    if (!token) {
        throw new UnauthorizedError('Usuário não autenticado.');
    }

    const decoded: App.Auth.IJWTUserPayload = validateAuthToken(token);
    const user = await sequelize?.transaction(async (transaction) => {
        return await Usuario.findOne({
            attributes: [
                'id',
                'nome',
                'email',
                'senha'
            ],
            where: { id: decoded.id },
            transaction,
            raw: true
        });
    });

    if (!user) {
        throw new UnauthorizedError('Usuário não autenticado.');
    }

    return { user };
}

async function authorizationMiddleware(request: Request, _response: Response, next: NextFunction) {
    try {
        const { path } = request;
        
        if (path === '/usuarios/login') return next();
        if (path === '/usuarios/cadastro') return next();
        
        const { headers } = request;
        const { authorization } = headers;
        if (!authorization) {
            throw new UnauthorizedError('Usuário não autenticado.');
        }

        const token = extractTokenWithScheme('Bearer', authorization); 
        const { user } = await generateAuthorizationData(token);

        request.user = user;
        next();

    } catch (err) {
        next(err);
    }
}

export default authorizationMiddleware;