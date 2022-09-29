import mongoose, { Document, Schema } from 'mongoose';

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

export interface UserDocument extends IUser, Document {
  _doc: { [x: string]: any; password: any; }
  updatedAt: Date;
  createdAt: Date;
}

const UserSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true },
        nickname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'USER' },
        address: { type: Object, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const userModel = mongoose.model('User', UserSchema);
export default userModel;
