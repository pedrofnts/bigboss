import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
interface JwtPayload {
  id: number;
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ auth: false, message: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

    const user = await User.findById(id);

    if (!user) {
        return res.status(401).send({ auth: false, message: 'Não autorizado' });
    }

    const { _id, name, nickname, email, address } = user;

    req.user = { _id, name, nickname, email, address };

    next();
};
