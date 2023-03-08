import Joi, {
    AnySchema, Extension, NumberSchema, Root, StringSchema, ValidationError
} from 'joi';

import { OrderTuple } from '~/helpers/request-query';
import { isValidOrder, validateCNPJ, validateCPF } from '~/helpers/validator-helper';

interface DatabaseIdSchema extends NumberSchema {}

interface PessoaSchema extends StringSchema {
    cpf(): this;
    cnpj(): this;
}

interface CustomSchema extends AnySchema {
    json(): this;
}

interface RequestSchema extends AnySchema {
    orders(): this;
}

interface ExtendedJoi extends Root {
    databaseId(): DatabaseIdSchema;
    pessoa(): PessoaSchema;
    customValidate(): CustomSchema;
    request(): RequestSchema;
}

const extensions: Array<Extension> = [
    {
        type: 'databaseId',
        base: Joi.number()
            .integer()
            .min(1)
            .meta({ baseType: 'number' }),
    },
    {
        type: 'pessoa',
        base: Joi.string()
            .meta({ baseType: 'string' }),
        messages: {
            'cpf.invalid': 'Invalid CPF document',
            'cnpj.invalid': 'Invalid CNPJ document',
        },
        rules: {
            cpf: {
                method() {
                    return this.$_addRule('cpf');
                },
                validate(value, helpers) {
                    if (!validateCPF(value)) {
                        return helpers.error('cpf.invalid', { value });
                    }
                    return value;
                },
            },
            cnpj: {
                method() {
                    return this.$_addRule('cnpj');
                },
                validate(value, helpers) {
                    if (!validateCNPJ(value)) {
                        return helpers.error('cnpj.invalid', { value });
                    }
                    return value;
                },
            },
        },
    },
    {
        type: 'request',
        base: Joi.any()
            .meta({ baseType: 'any' }),
        messages: {
            'orders.json.invalid': '{{#label}} must be a valid JSON Array',
            'orders.item.invalid': '{{#label}} must be an array of [column, direction]',
        },
        rules: {
            orders: {
                method() {
                    return this.$_addRule('orders');
                },
                validate(value: string | string[], helpers) {
                    const errors: ValidationError[] = helpers.errorsArray();

                    try {
                        let orders: OrderTuple[];
                        if (Array.isArray(value)) {
                            orders = value.map(item => JSON.parse(item));
                        } else if (typeof value === 'string') {
                            orders = JSON.parse(value);
                        } else {
                            orders = value;
                        }

                        orders.forEach((item, index) => {
                            const isValid = item.length === 2 && isValidOrder(item);
                            if (!isValid) {
                                const path = [...helpers.state.path, index];
                                const err = helpers.error('orders.item.invalid', null, helpers.state.localize(path));
                                errors.push(err);
                            }
                        });

                        return errors.length ? errors : orders;
                    } catch (error) {
                        return helpers.error('orders.json.invalid', { value });
                    }
                },
            },
        },
    },
    {
        type: 'customValidate',
        base: Joi.any()
            .meta({ baseType: 'any' }),
        messages: {
            'json.invalid': '"{{#label}}" must be a valid json',
        },
        rules: {
            json: {
                method() {
                    return this.$_addRule('json');
                },
                validate(value, helpers) {
                    try {
                        if (typeof value === 'string') {
                            return JSON.parse(value);
                        }
                        if (Array.isArray(value)) {
                            return value.map(v => JSON.parse(v));
                        }
                    } catch (err) { /**/ }

                    return helpers.error('json.invalid', { value });
                },
            },
        },
    },
];

const extendedJoi = Joi.extend(...extensions) as ExtendedJoi;

export default extendedJoi;
