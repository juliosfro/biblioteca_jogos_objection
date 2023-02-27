import Usuario from '~/domains/usuarios/model';

export type CreateJogoAdquirido = {
    id_jogo: number
    id_usuario: number
    usuario?: Usuario
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
};


export type FilterJogosAdquiridos = {
    isDeleted?: boolean
    includeDeleted?: boolean
};

export type JogosAdquiridos = {
    id_jogo: number
    id_usuario: number
    usuario?: Usuario
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

type ListFilters = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export type GetAllJogosAdquiridosFilters = ListFilters