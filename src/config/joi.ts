import Joi from 'joi';

const joiConfig: Joi.ValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
};

export default joiConfig;
