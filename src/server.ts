import { config } from "./config/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";

const router = express();

/* Conexão com mongo */

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Conectado");
  })
  .catch((error) => {
    console.log(error);
  });
