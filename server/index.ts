import express from "express";
import mongoose from "mongoose";
const app = express();
const cors = require("cors");

import { connectToMongo } from "./services/connect";
import { bookRouter } from "./route/book";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
require("dotenv").config();

const MONGO: string = process.env.MONGO ?? "String Not defined";
connectToMongo(MONGO)
  .then(() => {
    console.log("Mongo DB successfully connected !");
  })
  .catch((e) => {
    console.log("error in mongo connect ");
  });

// Defing routes
app.use("/book", bookRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server successfully runs at port ${process.env.PORT} !`);
});
