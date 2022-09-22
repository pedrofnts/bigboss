import { config } from "./config/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import Logging from "./library/Logging";

const router = express();

/* Conexão com mongo */

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Conectado ao mongoDB");
  })
  .catch((error) => {
    Logging.info(error);
  });
