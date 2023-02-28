import JogoAdquirido from '~/domains/jogos-adquiridos/model';
import { CreateJogoAdquirido } from '~/domains/jogos-adquiridos/types';

async function create(payload: CreateJogoAdquirido): Promise<JogoAdquirido> {
    return JogoAdquirido.transaction(async (transacting) => {
        return await JogoAdquirido
            .query(transacting)
            .insertAndFetch(payload)
            .withGraphFetched(
                `usuario
                .jogos_adquiridos
                .jogo
                .categoria`
            );
    });
}

async function update(id: number, payload: Partial<CreateJogoAdquirido>): Promise<JogoAdquirido> {
    return JogoAdquirido.transaction(async (transacting) => {
        const jogoAdquirido = await JogoAdquirido
            .query(transacting)
            .findOne({
                id_usuario: payload.id_usuario,
                id_jogo: id,
            });

        return await jogoAdquirido
            .$query(transacting)
            .updateAndFetch(payload)
            .withGraphFetched(
                `usuario
                .jogos_adquiridos
                .jogo
                .categoria`
            );
    });
}

async function getAll(): Promise<JogoAdquirido[]> {
    return JogoAdquirido.transaction(async (transacting) => {
        return await JogoAdquirido
            .query(transacting)
            .modify('getListModifier');
    });
}

export {
    create,
    update,
    getAll
};
