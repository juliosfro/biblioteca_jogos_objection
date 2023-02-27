import CategoriaJogo from '~/domains/categoria-jogos/model';

export type CreateJogo = {
    id: number
    nome: string
    id_categoria_jogo: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
};

export type Jogos = {
    id: number
    nome: string
    categoria: CategoriaJogo
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export type FilterJogos = {
    isDeleted?: boolean
    includeDeleted?: boolean
};

type ListFilters = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export type GetAllJogosFilters = ListFilters