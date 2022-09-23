import mongoose, { Document, Schema } from "mongoose";

export interface IAsset {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface IAssetModel extends IAsset, Document {}

const AssetSchema: Schema = new Schema(
  {
    category: { type: String, required: true }, // "Esportes ou Entretenimento"
    album: { type: String, required: true }, // "Copa do Mundo ou Champions League"
    year: { type: Number, required: true }, // "2022 ou 2014"
    country: { type: String }, // "Brasil ou Alemanha"
    tier: { type: String }, // "Legend ou Rookie ou Comum"
    color: { type: String }, // "Ouro ou Prata ou Bronze"
    title: { type: String, required: true }, // "Neymar ou Messi ou Ronaldo"
    description: { type: String }, // "Troco em figurinha do Messi"
    image: { type: String, required: true }, // "link da imagem"
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // usuário
  },
  { versionKey: true, timestamps: true }
);

export default mongoose.model<IAssetModel>("Asset", AssetSchema);
