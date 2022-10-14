import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IPost {
  description: string;
  assets: IAssets;
  user: ObjectId | string;
}

export interface IAssets {
  offer: Array<string>;
  want: Array<string>;
}

export interface PostDocument extends IPost, Document {
  _doc: { [x: string]: unknown; password: unknown };
  updatedAt: Date;
  createdAt: Date;
}

const PostSchema: Schema = new Schema<PostDocument>(
  {
    description: { type: String },
    assets: { type: Object, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", PostSchema);
export default postModel;
