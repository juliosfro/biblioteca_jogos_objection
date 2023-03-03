const CONSTRAINT_ERRORS = {
    EMAIL_USUARIOS_UNIQUE_CONSTRAINT: 'usuarios.email_usuarios_unique_constraint',
    NOME_JOGOS_UNIQUE_CONSTRAINT: 'jogos.nome_jogos_unique_constraint',
    NOME_CATEGORIA_JOGOS_UNIQUE_CONSTRAINT: 'categoria_jogos.nome_categoria_jogos_unique_constraint',
    JOGOS_ID_CATEGORIA_JOGO_FOREIGN: 'jogos_id_categoria_jogo_foreign', 
    JOGOS_ADQUIRIDOS_ID_USUARIO_FOREIGN: 'jogos_adquiridos_id_usuario_foreign',
    JOGOS_ADQUIRIDOS_ID_JOGO_FOREIGN: 'jogos_adquiridos_id_jogo_foreign',
    PRIMARY: 'jogos_adquiridos.PRIMARY'
};

const DATABASE_ERRORS = {
    ERROR: 'Error',
    SEQUELIZE_DATABASE_ERROR: 'SequelizeDatabaseError',
    SEQUELIZE_UNIQUE_CONSTRAINT_ERROR: 'SequelizeUniqueConstraintError',
    VALIDATION_ERROR: 'ValidationError',
    NOT_FOUND_ERROR: 'NotFoundError',
    CONFLICT_ERROR: 'ConflictError',
    UNAUTHORIZED_ERROR: 'UnauthorizedError',
    PRECONDITION_FAILED_EXCEPTION: 'PreconditionFailedException',
    JSON_WEBTOKEN_ERROR: 'JsonWebTokenError',
    FORBIDDEN_ERROR: 'ForbiddenError',
    UNIQUE_VIOLATION_ERROR: 'UniqueViolationError',
    ER_BAD_FIELD_ERROR: 'ER_BAD_FIELD_ERROR',
    FOREIGN_KEY_VIOLATION_ERROR: 'ForeignKeyViolationError',
    CONSTRAINT_ERRORS
};

const AUTH_ERRORS = {
    1000: 'Senha incorreta. Por favor, tente novamente.',
    1001: 'Ocorreu um erro ao processar a operação. Por favor, tente novamente mais tarde.',
    1002: 'Não foi possível conectar ao servidor. Verifique sua conexão de rede.',
    1003: 'Houve um problema ao carregar os dados. Por favor, atualize a página.',
    1004: 'As credenciais informadas são inválidas. Por favor, tente novamente.',
};

const UNAUTHORIZED_ERRORS = {
    100: 'Token inválido.'
};

const EMAIL_USUARIOS_UNIQUE_CONSTRAINT = {
    101: 'Esse e-mail já foi cadastrado anteriormente.'
};

const CATEGORIA = {
    101: 'Essa categoria já foi cadastrada anteriormente.',
    102: 'Categoria inexistente.'
};

const NOME_JOGOS_UNIQUE_CONSTRAINT = {
    101: 'Esse jogo já foi cadastrado anteriormente.'
};

const PRIMARY = {
    101: 'Esse jogo já foi adquirido.'
};

const ER_BAD_FIELD_ERROR = {
    102: 'Parâmetros inválidos.'
};

const DEFAULT = {
    1: 'Houve um erro ao tentar realizar o cadastro.' 
};

const NOT_FOUND_ERROR = {
    1: 'Usuário não encontrado.',
    2: 'Jogo não encontrado.',
    3: 'Categoria não encontrada.',
    4: 'Jogo adquirido não encontrado.'
};

const APP_MSG_ERRORS = {
    AUTH_ERRORS,
    EMAIL_USUARIOS_UNIQUE_CONSTRAINT,
    CATEGORIA,
    NOME_JOGOS_UNIQUE_CONSTRAINT,
    PRIMARY,
    ER_BAD_FIELD_ERROR,
    DEFAULT,
    NOT_FOUND_ERROR,
    UNAUTHORIZED_ERRORS
};

export {
    APP_MSG_ERRORS,
    DATABASE_ERRORS
};
