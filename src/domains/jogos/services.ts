import Jogo from '~/domains/jogos/model';
import { CreateJogo } from '~/domains/jogos/types';

async function create(payload: CreateJogo): Promise<Jogo> {
    return Jogo.transaction(async (transacting) => {
        return await Jogo
            .query(transacting)
            .insertAndFetch(payload)
            .withGraphFetched('categoria');
    });
}

async function update(id: number, payload: Partial<Jogo>): Promise<Jogo> {
    return Jogo.transaction(async (transacting) => {
        const jogo = await Jogo
            .query(transacting)
            .findById(id);

        return await jogo
            .$query(transacting)
            .updateAndFetch(payload)
            .withGraphFetched('categoria');
    });
}

async function getAll(): Promise<Jogo[]> {
    return Jogo.transaction(async (transacting) => {
        return await Jogo.query(transacting)
            .withGraphFetched('categoria');
    });
}

async function getById(id: number): Promise<Jogo> {
    return Jogo.transaction(async (transacting) => {
        return await Jogo
            .query(transacting)
            .findById(id)
            .withGraphFetched('categoria');
    });
}

async function deleteById(id: number): Promise<number> {
    return Jogo.transaction(async (transacting) => {
        return await Jogo
            .query(transacting)
            .deleteById(id);
    });
}

export {
    create,
    update,
    getAll,
    getById,
    deleteById
};
