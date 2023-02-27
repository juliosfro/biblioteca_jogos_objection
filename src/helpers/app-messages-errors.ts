export const ERRORS = {
    ERROR: 'Error',
    SEQUELIZE_DATABASE_ERROR: 'SequelizeDatabaseError',
    SEQUELIZE_UNIQUE_CONSTRAINT_ERROR: 'SequelizeUniqueConstraintError',
    VALIDATION_ERROR: 'ValidationError',
    NOT_FOUND_ERROR: 'NotFoundError',
    CONFLICT_ERROR: 'ConflictError',
    UNAUTHORIZED_ERROR: 'UnauthorizedError',
    PRECONDITION_FAILED_EXCEPTION: 'PreconditionFailedException',
    JSON_WEBTOKEN_ERROR: 'JsonWebTokenError',
    FORBIDDEN_ERROR: 'ForbiddenError'
};

export const AUTH_ERRORS = {
    1000: 'Senha incorreta. Por favor, tente novamente.',
    1001: 'Ocorreu um erro ao processar a operação. Por favor, tente novamente mais tarde.',
    1002: 'Não foi possível conectar ao servidor. Verifique sua conexão de rede.',
    1003: 'Houve um problema ao carregar os dados. Por favor, atualize a página.',
    1004: 'As credenciais informadas são inválidas. Por favor, tente novamente.',
};

export const UNAUTHORIZED_ERRORS = {
    100: 'Token inválido.'
};

export const EMAIL_USUARIOS_UNIQUE_CONSTRAINT = {
    101: 'Esse e-mail já foi cadastrado anteriormente.'
};

export const NOME_CATEGORIA_JOGOS_UNIQUE_CONSTRAINT = {
    101: 'Essa categoria já foi cadastrada anteriormente.'
};

export const NOME_JOGOS_UNIQUE_CONSTRAINT = {
    101: 'Esse jogo já foi cadastrado anteriormente.'
};

export const PRIMARY = {
    101: 'Esse jogo já foi adquirido.'
};

export const ER_BAD_FIELD_ERROR = {
    102: 'Parâmetros inválidos.'
};

export const DEFAULT = {
    1: 'Houve um erro ao tentar realizar o cadastro.' 
};

export const NOT_FOUND_ERROR = {
    1: 'Usuário não encontrado.',
    2: 'Jogo não encontrado.',
    3: 'Categoria não encontrada.'
};