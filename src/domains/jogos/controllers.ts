import { NextFunction, Request, Response } from 'express';
import * as service from '~/domains/jogos/services';
import { CreateJogo } from '~/domains/jogos/types';

async function create(request: Request, response: Response, next: NextFunction) {
    try {
        const { body } = request;
        const payload: CreateJogo = body;
        
        const jogo = await service.create(payload);
        response
            .status(201)
            .send(jogo);
        
    } catch (error) {
        next(error);
    }
}

async function update(request: Request, response: Response, next: NextFunction) {
    try {
        const { body, params } = request;
        const { id } = params;
        
        const payload = body;
        const idCategoriaJogo = Number(id);
        
        const jogo = await service.update(idCategoriaJogo, payload);
        response
            .status(201)
            .send(jogo);
        
    } catch (error) {
        next(error);
    }
}

async function getById(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const { id } = params;
        const idJogo = Number(id);

        const jogo = await service.getById(idJogo);
        response
            .status(200)
            .send(jogo);
        
    } catch (error) {
        next(error);
    }
}

async function deleteById(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const { id } = params;
        const idJogo = Number(id);
        
        const jogoIsDeleted = await service.deleteById(idJogo);
        response
            .status(204)
            .json(jogoIsDeleted);

    } catch (error) {
        next(error);
    }
}

async function getAll(_request: Request, response: Response, next: NextFunction) {
    try {
        const jogos = await service.getAll();
        response
            .status(200)
            .send(jogos);
        
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
