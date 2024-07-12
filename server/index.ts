import express from "express";
import mongoose from "mongoose";
const app = express();
const cors = require("cors");
import { sendVerificationEmail } from "./controller/sendEmail";
import { connectToMongo } from "./services/connect";
import { bookRouter } from "./route/book";
import { UserAuth } from "./route/user";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
require("dotenv").config();

const MONGO: string = process.env.MONGO ?? "String Not defined";
connectToMongo(MONGO)
  .then(() => {
    console.log("Mongo DB successfully connected !");
  })
  .catch((e) => {
    console.log("key", MONGO);

    console.log("error in mongo connect ", e);
  });

// Defing routes
app.use("/book", bookRouter);
app.use("/auth", UserAuth);

app.listen(process.env.PORT, () => {
  console.log(`Server successfully runs at port ${process.env.PORT} !`);
});
