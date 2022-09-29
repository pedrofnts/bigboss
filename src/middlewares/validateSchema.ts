import { IPost } from './../models/Post';
import { IUser } from './../models/User';
import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';

const UFs = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
];

export const validateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            name: Joi.string().required(),
            nickname: Joi.string().alphanum().min(3).max(10).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            role: Joi.string().valid('user').required(),
            address: Joi.object({
                street: Joi.string().required(),
                number: Joi.number().required(),
                city: Joi.string().required(),
                state: Joi.string()
                    .valid(...UFs)
                    .required(),
                country: Joi.string().valid('Brasil').required(),
            }).required(),
        }),

        update: Joi.object<IUser>({
            name: Joi.string().required(),
            nickname: Joi.string().alphanum().min(3).max(10).required(),
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
            role: Joi.string().valid('user').required(),
            address: Joi.object({
                street: Joi.string().required(),
                number: Joi.number().required(),
                city: Joi.string().required(),
                state: Joi.string()
                    .valid(...UFs)
                    .required(),
                country: Joi.string().valid('Brasil').required(),
            }),
        }),
    },

    post: {
        create: Joi.object<IPost>({
            category: Joi.string()
                .valid('Esportes', 'Filmes e Séries', 'Desenhos Animados')
                .required(),
            album: Joi.string().required(),
            year: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            assets: Joi.object({
                offer: Joi.array().items(Joi.string().min(1).max(6)).required(),
                want: Joi.array().items(Joi.string().min(1).max(6)).required(),
            }).required(),
        }),

        update: Joi.object<IPost>({
            category: Joi.string().required(),
            album: Joi.string().required(),
            year: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            assets: Joi.object({
                offer: Joi.array().items(Joi.string()).required(),
                want: Joi.array().items(Joi.string()).required(),
            }).required(),
        }),
    },
};
