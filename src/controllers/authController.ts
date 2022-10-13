import { IUser } from './../models/User';
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default class AuthController {

    static async login(req: Request, res: Response) {

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" })
            }
        
            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (passwordIsValid) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_PASS ?? '', {
                    expiresIn: 86400,
                });

                return res.status(200).send({ id: user._id, name: user.name, email, auth: true, token });
            }

            return res.status(401).json({ message: "Email ou senha inválidos" })

        } catch (error: unknown) {
            let message;
            if (error instanceof Error) {
                message = error.message;
            } else {
                message = error;
            }

            res.status(500).json({ message });
        };

    }

    static getProfile(req: Request, res: Response) {
        const user = req.user;

        res.status(200).send(user);
    }

}

