import Joi, { Schema } from 'joi';
import { CreateUsuario } from '~/domains/usuarios/types';

const validatorCreate = (schema: Schema) => (payload: CreateUsuario) =>
    schema.validate(payload, { abortEarly: false });

const createUsuarioSchema = Joi.object({
    nome: Joi.string()
        .required()
        .max(40)
        .messages({
            'string.empty': '{{#label}}: O campo nome não pode ser vazio',
            'any.required': '{{#label}}: O campo nome é requerido',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': '{{#label}}: O campo e-mail não pode ser vazio',
            'string.email': '{{#label}}: E-mail inválido',
        }),
    senha: Joi.string()
        .min(6)
        .max(10)
        .required()
        .messages({
            'string.empty': '{{#label}}: O campo senha não pode ser vazio',
            'string.min': '{{#label}}: O campo senha deve conter no mínimo {{#limit}} caracteres',
            'string.max': '{{#label}}: O campo senha deve conter no máximo {{#limit}} caracteres',
            'any.required': '{{#label}}: O campo senha é requerido',
        }),
    confirma_senha: Joi.string()
        .required()
        .valid(Joi.ref('senha'))
        .messages({
            'string.empty': '{{#label}}: O campo de confirmação de senha não pode ser vazio',
            'any.only': '{{#label}}: As informações dos campos de senhas não conferem',
            'any.required': '{{#label}}: O campo de confirmação de senha é requerido',
        })
});

const createUsuario = validatorCreate(createUsuarioSchema);

export default {
    createUsuario,
};