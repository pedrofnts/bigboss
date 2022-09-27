import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  name: string;
  nickname: string;
  email: string;
  password: string;
  role: string;
  address: IAddress;
}
export interface IAddress {
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER" },
    address: { type: Object, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IUserModel>("User", UserSchema);
