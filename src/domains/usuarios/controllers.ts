import { ForbiddenError } from '@casl/ability';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import Usuario from '~/domains/usuarios/model';
import * as service from '~/domains/usuarios/services';
import { CreateUsuario } from '~/domains/usuarios/types';
import { NotFoundError } from '~/helpers/api-class-errors';
import { APP_MSG_ERRORS } from '~/helpers/app-errors-and-messages';
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

async function getAll(request: Request, response: Response, next: NextFunction) {
    try {
        const {
            filterBy, orderBy,
            pagination, ability
        } = request;

        ForbiddenError.from(ability!).throwUnlessCan('find', 'Usuario');
      
        const [total, usuarios] = await Usuario.transaction(
            async transacting => {
                const usuarioQuery = Usuario.query(transacting);

                if (filterBy) filterBy(usuarioQuery);
                if (orderBy) orderBy(usuarioQuery);

                const countQuery = usuarioQuery
                    .resultSize();
                
                const resultQuery = usuarioQuery
                    .limit(pagination!.limit)
                    .offset(pagination!.offset);
                
                return Promise.all([
                    countQuery,
                    resultQuery,
                ]);
            },
        );
       
        response.status(200).json({
            metadata: {
                total,
                pages: Math.ceil(total / pagination!.limit),
                page: pagination!.page,
                limit: pagination!.limit,
                length: usuarios.length,
            },
            usuarios,
        });

    } catch (error) {
        next(error);
    }
}

async function getById(request: Request, response: Response, next: NextFunction) {
    try {
        const { params, ability } = request;
        const { id } = params;
        const usuarioId = Number(id);

        const usuarioCurrent = await service.getById(usuarioId);

        const abilitySubject = {
            ...usuarioCurrent,
            modelName: 'Usuario'
        };
        
        ForbiddenError
            .from(ability)
            .throwUnlessCan('read', abilitySubject);

        response
            .status(200)
            .json(usuarioCurrent);

    } catch (error) {
        next(error);
    }
}

async function update(request: Request, response: Response, next: NextFunction) {
    try {
        const { body, params, ability } = request;
        const { id } = params;
        const payload = body;
        const { senha } = payload;
        const idUsuario = Number(id);

        const usuarioCurrent = await service.getById(idUsuario);

        const abilitySubject = {
            ...usuarioCurrent,
            modelName: 'Usuario'
        };

        ForbiddenError
            .from(ability)
            .throwUnlessCan('update', abilitySubject);

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

async function refresh(request: Request, response: Response, next: NextFunction) {
    try {
        const { user } = request;
        const payload = extractUserPayloadAttributes(user);
        const token = generateAuthToken(payload);

        response.json({
            token,
            user,
        });
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
        if (!isPasswordCorrect) return response.status(409).json({ message: APP_MSG_ERRORS.AUTH_ERRORS[1000] });

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
    refresh,
    login
};
