export type CreateCategoriaJogo = {
    id: number;
    nome: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type FilterCategoriaJogo = {
    isDeleted?: boolean
}

type ListFilters = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export type CategoriaJogo = {
    id: number;
    nome: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type GetAllCategoriaJogosFilters = ListFilters