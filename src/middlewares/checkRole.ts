import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const checkRole = async (req: Request, res: Response, next: NextFunction) => {

    const data = req;
    console.log(data)

    try {
        const user = await User.findById(data.user._doc._id)
        console.log(user)
        if (!user) {  
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        if (user.role !== 'ADMIN') {
            return res.status(401).json({ message: 'Não autorizado' })
        }

        next()

    } catch (error: unknown) {
        let message
        if (error instanceof Error) {
            message = error.message
        } else {
            message = error
        }
        return res.status(401).json({ message })
    }
}