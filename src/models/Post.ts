import mongoose, { Document, Schema } from "mongoose";

export interface IPost {
  category: string;
  album: string;
  year: string;
  title: string;
  description: string;
  assets: string;
  author: string;
}

export interface IAssets {
  offer: Array<string>;
  want: Array<string>;
}

export interface IPostModel extends IPost, Document {}

const PostSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    album: { type: String, required: true },
    year: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    assets: { type: Object, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model<IPostModel>("Post", PostSchema);
