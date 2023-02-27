import { NextFunction, Request, Response } from 'express';
import * as service from '~/domains/categoria-jogos/services';
import { CreateCategoriaJogo } from '~/domains/categoria-jogos/types';

async function create(request: Request, response: Response, next: NextFunction) {
    try {
        const { body } = request;
        const payload: CreateCategoriaJogo = body;
        
        const categoriaJogo = await service.create(payload);
        response
            .status(201)
            .json(categoriaJogo);
        
    } catch (error) {
        next(error);
    }
}

async function update(request: Request, response: Response, next: NextFunction) {
    try {
        const { body: payload, params } = request;
        const { id } = params;
        const idCategoriaJogo = Number(id);

        const usuario = await service.update(idCategoriaJogo, payload);
        response
            .status(201)
            .send(usuario);

    } catch (error) {
        next(error);
    }
}

async function getAll(_request: Request, response: Response, next: NextFunction) {
    try {
        const categoriaJogo = await service.getAll();
        response
            .status(200)
            .json(categoriaJogo);

    } catch (error) {
        next(error);
    }
}

async function getById(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const { id } = params;
        const categoriaJogoId = Number(id);

        const categoriaJogo = await service.getById(categoriaJogoId);
        response
            .status(200)
            .json(categoriaJogo);

    } catch (error) {
        next(error);
    }
}

async function deleteById(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const { id } = params;
        const categoriaJogoId = Number(id);

        const isDeleted = await service.deleteById(categoriaJogoId);
        response
            .status(204)
            .json(isDeleted);

    } catch (error) {
        next(error);
    }
}

export {
    create,
    update,
    getAll,
    getById,
    deleteById
};
