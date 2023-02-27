import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import * as service from '~/domains/usuarios/services';
import { CreateUsuario } from '~/domains/usuarios/types';

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

export default {
    create,
    update,
    getAll,
    getById,
    deleteById
};
