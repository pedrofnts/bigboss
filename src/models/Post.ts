import mongoose, { Document, Schema, Types } from 'mongoose';
import { IUser } from './User';

export interface IPost {
  category: string;
  album: string;
  year: number;
  title: string;
  description: string;
  assets: IAssets;
  user: IUser;
}

export interface IAssets {
  offer: Array<string>;
  want: Array<string>;
}

export interface PostDocument extends IPost, Document {
  updatedAt: Date;
  createdAt: Date;
}

const PostSchema: Schema = new Schema<PostDocument>(
    {
        category: { type: String, required: true },
        album: { type: String, required: true },
        year: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String },
        assets: { type: Object, required: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    },
    { versionKey: false, timestamps: true }
);

const postModel = mongoose.model('Post', PostSchema);
export default postModel;