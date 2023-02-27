export type CreateUsuario = {
    id: number;
    nome: string;
    email: string;
    senha: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};

export type FilterUsuario = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

type ListFilters = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export type Usuarios = {
    id: number;
    nome: string;
    email: string,
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface GetAllUsuariosFilters extends ListFilters {
    isPublished?: boolean
    isNotPublished?: boolean
}
