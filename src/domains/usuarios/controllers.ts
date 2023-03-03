import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import Usuario from '~/domains/usuarios/model';
import * as service from '~/domains/usuarios/services';
import { CreateUsuario } from '~/domains/usuarios/types';
import { NotFoundError } from '~/helpers/api-errors';
import { APP_MSG_ERRORS, AUTH_ERRORS } from '~/helpers/app-messages-errors';
import { extractUserPayloadAttributes, generateAuthToken } from '~/helpers/auth';

const BCRYPT_SALT_LENGTH = Number(process.env.BCRYPT_SALT_LENGTH);

async function create(request: Request, response: Response, next: NextFunction) {
    try {
        const { body } = request;
        const payload: CreateUsuario = body;
  
        const usuario = await service.create(payload);
        response
            .status(201)
            .json(usuario);
    }
    catch (error) {
        next(error);
    }
}

async function getAll(_request: Request, response: Response, next: NextFunction) {
    try {
        const usuarios = await service.getAll();
        response
            .status(200)
            .json(usuarios);

    } catch (error) {
        next(error);
    }
}

async function getById(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const { id } = params;
        const usuarioId = Number(id);

        const usuario = await service.getById(usuarioId);
        response
            .status(200)
            .json(usuario);

    } catch (error) {
        next(error);
    }
}

async function update(request: Request, response: Response, next: NextFunction) {
    try {
        const { body, params } = request;
        const { id } = params;
        const payload = body;
        const { senha } = payload;
        const idUsuario = Number(id);

        const senhaCriptografada = bcrypt.hashSync(senha, BCRYPT_SALT_LENGTH);

        const userWithEncryptedPassword = {
            ...payload,
            senha: senhaCriptografada
        };

        const usuario = await service.update(idUsuario, userWithEncryptedPassword);
        response
            .status(201)
            .send(usuario);

    } catch (error) {
        next(error);
    }
}

async function deleteById(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const { id } = params;
        const idusuario = Number(id);

        const isDeleted = await service.deleteById(idusuario);
        response
            .status(204)
            .json(isDeleted);

    } catch (error) {
        next(error);
    }
}

async function login(request: Request, response: Response, next: NextFunction) {
    try {
        const { body } = request;
        const { senha, email } = body;

        const usuario: Usuario = await service.findUserByEmail(email);
        if (!usuario.id) throw new NotFoundError(APP_MSG_ERRORS.NOT_FOUND_ERROR[1]);

        const { senha: senhaHash } = usuario;
        const isPasswordCorrect = bcrypt.compareSync(senha, senhaHash);
        if (!isPasswordCorrect) return response.status(409).json({ message: AUTH_ERRORS[1000] });

        const payload = extractUserPayloadAttributes(usuario);
        const token = generateAuthToken(payload);

        const userWithToken = {
            ...usuario,
            token,
        };

        response
            .status(200)
            .json(userWithToken);

    } catch (error) {
        next(error);
    }
}

export default {
    create,
    update,
    getAll,
    getById,
    deleteById,
    login
};
