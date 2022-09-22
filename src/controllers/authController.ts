import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = User.findOne({ email })
    .then((user) => {
      if (user) {
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (passwordIsValid) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_PASS ?? "", {
            expiresIn: 86400,
          });

          res.status(200).send({ auth: true, token });
        } else {
          res.status(401).send({ auth: false, token: null });
        }
      } else {
        res.status(404).send("Usuário não encontrado");
      }
    })
    .catch((error) => res.status(500).json({ error, status: "error" }));
};

export default { login };
