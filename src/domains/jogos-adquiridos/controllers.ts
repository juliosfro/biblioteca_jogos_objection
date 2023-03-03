import { NextFunction, Request, Response } from 'express';
import * as service from '~/domains/jogos-adquiridos/services';
import { CreateJogoAdquirido } from '~/domains/jogos-adquiridos/types';

async function create(request: Request, response: Response, next: NextFunction) {
    try {
        const { body } = request;
        const payload: CreateJogoAdquirido = body;

        const jogoAdquirido = await service.create(payload);
        response
            .status(201)
            .send(jogoAdquirido);

    } catch (error) {
        next(error);
    }
}

async function update(request: Request, response: Response, next: NextFunction) {
    try {
        const { body: payload, params } = request;
        const id = Number(params.idJogo);

        const jogoAdquirido = await service.update(id, payload);
        response
            .status(201)
            .send(jogoAdquirido);

    } catch (error) {
        next(error);
    }
}

async function getAll(_request: Request, response: Response, next: NextFunction) {
    try {
        const jogosAdquiridos = await service.getAll();
        response
            .status(200)
            .json(jogosAdquiridos);

    } catch (error) {
        next(error);
    }
}

async function mostPurchasedGames(_request: Request, response: Response, next: NextFunction) {
    try {
        const jogosAdquiridos = await service.mostPurchasedGames();
        response
            .status(200)
            .send(jogosAdquiridos);

    } catch (error) {
        next(error);
    }
}

export default {
    create,
    update,
    getAll,
    mostPurchasedGames
};
