import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = (req: Request, res: Response, next: NextFunction) => {
  
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user: any) => {
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
};

const getProfile = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    res.status(200).send(user);
};

export default { login, getProfile };
