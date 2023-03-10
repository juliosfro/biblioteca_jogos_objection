import { NextFunction, Request, Response } from 'express';
import Jogo from '~/domains/jogos/model';
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

async function getAll(request: Request, response: Response, next: NextFunction) {
    try {
        const { filterBy, orderBy, pagination } = request;

        const [total, jogos] = await Jogo.transaction(
            async transacting => {
                const jogoQuery = Jogo.query(transacting)
                    .modify('getOneModifier');

                if (filterBy) filterBy(jogoQuery);
                if (orderBy) orderBy(jogoQuery);

                const countQuery = jogoQuery
                    .resultSize();

                const resultQuery = jogoQuery
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
                length: jogos.length,
            },
            jogos,
        });

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
