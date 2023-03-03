import {
    APP_MSG_ERRORS,
    DATABASE_ERRORS
} from '~/helpers/app-errors-and-messages';

function sendMsgError(errorPathOrCode: String) {
    switch (errorPathOrCode) {
    case DATABASE_ERRORS.CONSTRAINT_ERRORS.NOME_CATEGORIA_JOGOS_UNIQUE_CONSTRAINT:
        return APP_MSG_ERRORS.NOME_CATEGORIA_JOGOS_UNIQUE_CONSTRAINT[101];
        break;
    case DATABASE_ERRORS.CONSTRAINT_ERRORS.NOME_JOGOS_UNIQUE_CONSTRAINT:
        return APP_MSG_ERRORS.NOME_JOGOS_UNIQUE_CONSTRAINT[101];
        break;
    case DATABASE_ERRORS.CONSTRAINT_ERRORS.PRIMARY:
        return APP_MSG_ERRORS.PRIMARY[101];
        break;
    case DATABASE_ERRORS.ER_BAD_FIELD_ERROR:
        return APP_MSG_ERRORS.ER_BAD_FIELD_ERROR[102];
        break;
    case DATABASE_ERRORS.CONSTRAINT_ERRORS.EMAIL_USUARIOS_UNIQUE_CONSTRAINT:
        return APP_MSG_ERRORS.EMAIL_USUARIOS_UNIQUE_CONSTRAINT[101];
        break;
    default:
        return APP_MSG_ERRORS.DEFAULT[1];
    }
}

export {
    sendMsgError,
};
