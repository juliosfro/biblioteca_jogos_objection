import { NextFunction, Request, Response } from 'express';
import Usuario from '~/domains/usuarios/model';
import { createAbility } from '~/helpers/ability';
import { UnauthorizedError } from '~/helpers/api-class-errors';
import { extractTokenWithScheme, validateAuthToken } from '~/helpers/auth';

export async function generateAuthorizationData(token: string | null) {
    if (!token) {
        throw new UnauthorizedError('Usuário não autenticado.');
    }

    const decoded: App.Auth.IJWTUserPayload = validateAuthToken(token);
    const user = await Usuario.transaction(async (transaction) => {
        return Usuario
            .query(transaction)
            .modify('getLoginModifier')
            .findOne({
                id: decoded.id
            });
    });

    if (!user) {
        throw new UnauthorizedError('Usuário não encontrado.');
    }

    const ability = createAbility(user);
    return { user, ability };
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
        const { user, ability } = await generateAuthorizationData(token);
        
        request.user = user;
        request.ability = ability;
        next();

    } catch (err) {
        next(err);
    }
}

export default authorizationMiddleware;