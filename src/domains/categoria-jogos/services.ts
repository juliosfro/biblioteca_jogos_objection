import CategoriaJogo from '~/domains/categoria-jogos/model';
import { CreateCategoriaJogo } from '~/domains/categoria-jogos/types';

async function create(payload: CreateCategoriaJogo): Promise<CategoriaJogo> {
    return CategoriaJogo.transaction(async (transacting) => {
        return await CategoriaJogo
            .query(transacting)
            .insertAndFetch(payload);
    });
}

async function getAll(): Promise<CategoriaJogo[]>  {
    return CategoriaJogo.transaction(async (transacting) => {
        return await CategoriaJogo.query(transacting);
    });
}

async function getById(id: number): Promise<CategoriaJogo> {
    return CategoriaJogo.transaction(async (transacting) => {
        return await CategoriaJogo
            .query(transacting)
            .findById(id);
    });
}

async function update(id: number, payload: Partial<CategoriaJogo>): Promise<CategoriaJogo> {
    return CategoriaJogo.transaction(async (transacting) => {
        const categoriaJogo = await CategoriaJogo
            .query(transacting)
            .findById(id);

        return await categoriaJogo
            .$query(transacting)
            .updateAndFetch(payload);
    });
}

async function deleteById(id: number): Promise<boolean> {
    const deletedUsuarioCount = CategoriaJogo.transaction(async (transacting) => {
        return await CategoriaJogo
            .query(transacting)
            .deleteById(id);
    });

    return !!deletedUsuarioCount;
}

export {
    create,
    update,
    getAll,
    getById,
    deleteById
};
