import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, nickname, email, password, address, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: "Usuário já cadastrado" });
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    name,
    nickname,
    email,
    password: hashPassword,
    address,
    role
  });

  return user
    .save()
    .then((user: any) => {
      user.password = undefined;
      return res.status(201).json({ user });
    })
    .catch((error) => res.status(500).json({ error }));
};
const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Usuário não encontrado" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .select("-password")
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req;

  return User.findOne(user)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "Usuário não encontrado " });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req;

  return User.findOneAndDelete(user)
    .then((user) =>
      user
        ? res.status(201).json({ message: "Usuário excluído" })
        : res.status(404).json({ message: "Usuário não encontrado" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createUser, readUser, readAll, updateUser, deleteUser };
