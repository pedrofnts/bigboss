import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Post from "../models/Post";
import bcrypt from "bcrypt";
import { PostCategory, IPostCategory } from "../enumerators/PostEnum";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, album, year, title, description, assets } = req.body;
    const user = req.user;

    const post = new Post({
      category,
      album,
      year,
      title,
      description,
      assets,
      user: user._id,
    });

    await post.save();
  } catch (error) {
    return res.status(400).json({ message: "O post não pôde ser criado" });
  }
};
const readPost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;

  return Post.findById(postId)
    .populate("user", "name nickname address.city address.state")
    .then((post) =>
      post
        ? res.status(200).json({ post })
        : res.status(404).json({ message: "Post não encontrado" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const readAllPosts = (req: Request, res: Response, next: NextFunction) => {
  return Post.find()
    .populate("user", "name nickname address.city address.state")
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(500).json({ error }));
};

export default { createPost, readPost, readAllPosts };
