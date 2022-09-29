import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/User';

export default class AuthController {

    static login (req: Request, res: Response) {

        const { email, password } = req.body;

        User.findOne({ email })
            .then((user) => {
                if (user) {
                    const passwordIsValid = bcrypt.compareSync(password, user.password);

                    if (passwordIsValid) {
                        const token = jwt.sign({ id: user._id }, process.env.JWT_PASS ?? '', {
                            expiresIn: 86400,
                        });

                        res.status(200).send({ auth: true, token });
                    } else {
                        res.status(401).send({ auth: false, token: null });
                    }
                } else {
                    res.status(404).send('Usuário não encontrado');
                }
            })
            .catch((error: unknown) => {

                let message;
                if (error instanceof Error) {
                    message = error.message;
                } else {
                    message = error;
                }

                return res.status(500).json({ message });
            });
    }

    static getProfile (req: Request, res: Response) {
        const user = req.user;

        res.status(200).send(user);
    }

}

