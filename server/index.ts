import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { bookRouter } from "./route/book";
import { UserAuth } from "./route/user";
import { connectToMongo } from "./services/connect";
import { sendVerificationEmail } from "./controller/sendEmail";

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const MONGO: string = process.env.MONGO ?? "String Not defined";

console.log(MONGO);

connectToMongo(MONGO)
  .then(() => {
    console.log("Mongo DB successfully connected !");
  })
  .catch((e) => {
    console.log("error in mongo connect ", e);
  });

// Defing routes
app.use("/book", bookRouter);
app.use("/auth", UserAuth);

app.listen(process.env.PORT, () => {
  console.log(`Server successfully runs at port ${process.env.PORT} !`);
});
