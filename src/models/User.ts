import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  name: string;
  nickname: string;
  email: string;
  password: string;
  gender: string;
  birthDate: Date;
  // role: string;
  address: IAddress;
}

export interface IAddress {
  city: string;
  state: string;
}

export interface UserDocument extends IUser, Document {
  _doc: { [x: string]: unknown; password: unknown };
  updatedAt: Date;
  createdAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true, trim: true },
    //role: { type: String, default: "USER" },
    address: { type: Object, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel = mongoose.model("User", UserSchema);
export default userModel;
