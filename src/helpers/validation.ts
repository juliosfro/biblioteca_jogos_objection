import Joi from 'joi';

import defaultJoiConfig from '~/config/joi';
import UnprocessableEntityError from '~/helpers/http/unprocessable-entity-error';

type PlainObjectSchema = Record<string, Joi.AnySchema>;

export function createValidationSchema(schema: PlainObjectSchema, required: string[] = []): PlainObjectSchema {
    function reduceSchemaKey(object: PlainObjectSchema, [key, value]: [string, Joi.AnySchema]) {
        const validation = required.includes(key) ? value.required() : value;
        return { ...object, [key]: validation };
    }

    return Object.entries(schema)
        .reduce(reduceSchemaKey, {});
}

export default async function checkAndReturnValidationResult(
    schema: Joi.AnySchema,
    data: any,
    customConfig?: Joi.ValidationOptions,
) {
    const { error, value: sanitizedData } = schema.validate(
        data,
        {
            ...defaultJoiConfig,
            ...customConfig,
        },
    );

    if (!error) {
        return sanitizedData;
    }

    const report = error.details.map(detail => {
        const key = detail.path.join('.');
        const message = detail.message.replace(/['"]/g, '');

        return { [key]: message };
    });

    throw new UnprocessableEntityError(10, undefined, report);
}
