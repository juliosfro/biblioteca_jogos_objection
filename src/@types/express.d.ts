declare namespace Express {
    interface Request {
        user: import('~/domains/usuarios/model').default;
    }
}
