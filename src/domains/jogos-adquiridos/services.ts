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

export {
    create
};
