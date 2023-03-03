import jwt, {
    JsonWebTokenError, Secret, SignOptions,
    VerifyOptions
} from 'jsonwebtoken';

import { pick } from 'lodash';
import authConfig from '~/config/auth';
import Usuario from '~/domains/usuarios/model';
import { ForbiddenError, UnauthorizedError } from '~/helpers/api-errors';
import { AUTH_ERRORS, UNAUTHORIZED_ERRORS } from '~/helpers/app-messages-errors';

export function extractTokenWithScheme(scheme: string, authorization?: string) {
    const [extractedScheme, extractedValue] = authorization?.split(' ') || [];
    if (extractedScheme === scheme) {
        return extractedValue;
    }

    return null;
}

export function extractUserPayloadAttributes(usuario: Usuario): App.Auth.IJWTUserPayload {
    return pick(usuario, ['id', 'tipo']) as App.Auth.IJWTUserPayload;
}

export function generateAuthToken(payload?: App.Auth.IJWTUserPayload) {
    try {
        if (!payload) {
            throw new Error('Empty payload object.');
        }

        const privateKey: Secret = {
            passphrase: '',
            key: authConfig.privateKey,
        };

        const signOptions: SignOptions = {
            algorithm: 'RS256',
            expiresIn: authConfig.expires,
        };

        return jwt.sign(payload, privateKey, signOptions);
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new ForbiddenError(AUTH_ERRORS[1004]);
        }
        throw error;
    }
}

export function validateAuthToken(token: string | null) {
    if (token === 'undefined' || '' || null) {
        throw new UnauthorizedError(UNAUTHORIZED_ERRORS[100]);
    }

    try {
        const verifyOptions: VerifyOptions = {
            algorithms: ['RS256'],
        };
        return jwt.verify(token!, authConfig.publicKey, verifyOptions) as App.Auth.IJWTUserPayload;
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new ForbiddenError(AUTH_ERRORS[1004]);
        }
        throw error;
    }
}
