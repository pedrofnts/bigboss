import { Request, Response } from 'express';
import Post from '../models/Post';

export default class PostController {

    static createPost = async (req: Request, res: Response) => {
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
        } catch (error: unknown) {
            let message;
            if (error instanceof Error) {
                message = error.message;
            } else {
                message = error;
            }
            return res.status(400).json({ message: 'O post não pôde ser criado' });
        }
    };
    
    static readPost = (req: Request, res: Response) => {
        const postId = req.params.postId;
    
        return Post.findById(postId)
            .populate('user', 'name nickname address.city address.state')
            .then((post) =>
                post
                    ? res.status(200).json({ post })
                    : res.status(404).json({ message: 'Post não encontrado' })
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
    };
    
    static readAllPosts = (req: Request, res: Response) => {
        return Post.find()
            .populate('user', 'name nickname address.city address.state')
            .then(posts => res.status(200).json({ posts }))
            .catch((error: unknown) => {
    
                let message;
                if (error instanceof Error) {
                    message = error.message;
                } else {
                    message = error;
                }
                return res.status(401).json({ message });
    
            });
    };

}

