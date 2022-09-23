import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ auth: false, message: "Não autorizado" });
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

  const user = await User.findById(id);
  if (!user) {
    return res.status(401).send({ auth: false, message: "Não autorizado" });
  }

  const { password: _, ...userWithoutPassword } = user;

  req.user = userWithoutPassword;

  next();
};
