import Usuario from '~/domains/usuarios/model';
import { CreateUsuario } from '~/domains/usuarios/types';

async function create (payload: CreateUsuario): Promise<Usuario> {
    return Usuario.transaction(async (transacting) => { 
        return await Usuario
            .query(transacting)
            .insertAndFetch(payload);
    });
}

async function getAll(): Promise<Usuario[]>  {
    return Usuario.transaction(async (transacting) => {
        return await Usuario
            .query(transacting);
    });
}

async function getById(id: number): Promise<Usuario> {
    return Usuario.transaction(async (transacting) => {
        return await Usuario
            .query(transacting)
            .findById(id);
    });
}

async function update(id: number, payload: Partial<Usuario>): Promise<Usuario> {
    return Usuario.transaction(async (transacting) => {
        const usuario = await Usuario
            .query(transacting)
            .findById(id);
        
        return await usuario
            .$query(transacting)
            .updateAndFetch(payload);
    });
}

async function deleteById(id: number): Promise<boolean> {
    const deletedUsuarioCount = Usuario.transaction(async (transacting) => {
        return await Usuario
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
