import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";


export default class UserController {

  static async createUser(req: Request, res: Response) {
    let { name, nickname, email, password, gender, birthDate, address } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Usuário já cadastrado" });
    }
    console.log(birthDate);

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = new User({
      name,
      nickname,
      email,
      password: hashPassword,
      gender,
      birthDate,
      address,
    });

    return user
      .save()
      .then((user) => {
        const { password, ...userCreated } = user._doc;
        return res.status(201).json({ userCreated });
      })
      .catch((error: unknown) => {
        let message;
        if (error instanceof Error) {
          message = error.message;
        } else {
          message = error;
        }

        res.status(500).json({ message });
      });
  }

  static getUserById(req: Request, res: Response) {
    const userId = req.params.userId;

    return User.findById(userId)
      .then((user) =>
        user
          ? res.status(200).json({ user })
          : res.status(404).json({ message: "Usuário não encontrado" })
      )
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

  static getAllUsers(req: Request, res: Response) {
    return User.find()
      .select("-password")
      .then((users) => res.status(200).json({ users }))
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

  static updateUser(req: Request, res: Response) {
    const user = req;

    return User.findOne(user)
      .then((user) => {
        if (user) {
          user.set(req.body);

          return user
            .save()
            .then((user) => res.status(204).json({ user }))
            .catch((error) => {
              let message;
              if (error instanceof Error) {
                message = error.message;
              } else {
                message = error;
              }

              res.status(500).json({ message });
            });
        } else {
          return res.status(404).json({ message: "Usuário não encontrado " });
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

  static deleteUser(req: Request, res: Response) {
    const user = req;

    return User.findOneAndDelete(user)
      .then((user) =>
        user
          ? res.status(201).json({ message: "Usuário excluído" })
          : res.status(404).json({ message: "Usuário não encontrado" })
      )
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
}
