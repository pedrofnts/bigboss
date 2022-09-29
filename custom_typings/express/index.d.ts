import { IPost } from './../../src/models/Post';
import { IUser } from '../../models/User';

declare global {
  namespace Express {
    export interface Request {
      user: Partial<IUser>;
      post: Partial<IPost>
    }
  }
}

