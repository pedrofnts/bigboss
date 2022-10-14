import { Request, Response } from "express";
import { Get, Route, Post as PostTsoa, Delete, Put } from "tsoa";
import Post from "../models/Post";

Route("post");
export default class PostController {
  @PostTsoa("/post")
  static async createPost(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;

      const post = new Post({
        category: body.category,
        album: body.album,
        year: body.year,
        title: body.title,
        description: body.description,
        assets: body.assets,
        user: user._id,
      });

      await post.save();

      return res.status(201).json(post);
    } catch (error: unknown) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = error;
      }
      return res.status(400).json({ message });
    }
  }

  @Get("/post/:postId")
  static readPost(req: Request, res: Response) {
    const postId = req.params.postId;

    return Post.findById(postId)
      .populate("user", "name nickname address.city address.state")
      .then((post) =>
        post
          ? res.status(200).json({ post })
          : res.status(404).json({ message: "Post não encontrado" })
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

  @Get("/feed")
  static readAllPosts(req: Request, res: Response) {
    return Post.find()
      .populate("user", "name nickname address.city address.state")
      .then((posts) => res.status(200).json({ posts }))
      .catch((error: unknown) => {
        let message;
        if (error instanceof Error) {
          message = error.message;
        } else {
          message = error;
        }
        return res.status(401).json({ message });
      });
  }

  @Put("/post/:postId")
  static async updatePosts(req: Request, res: Response) {
    const post = req;

    try {
      const postToUpdate = await Post.findOne(post);

      if (!postToUpdate) {
        throw new Error();
      }

      postToUpdate.set(req.body);
      const postUpdated = await postToUpdate.save();

      return res.status(204).json(postUpdated);
    } catch (error: unknown) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = error;
      }
      return res.status(500).json({ message });
    }
  }

  @Delete("/post")
  static async deletePost(req: Request, res: Response) {
    const post = req;

    try {
      Post.findOneAndDelete({ post }, function (err: unknown) {
        if (err) throw new Error();

        return res.status(201).json({ message: "Post excluído" });
      });
    } catch (error: unknown) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = error;
      }
      return res.status(500).json({ message });
    }
  }
}
