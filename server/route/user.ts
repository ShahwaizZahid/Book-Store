import express from "express";
import {
  handleUserSignup,
  handleUserVAlidation,
  handleUserLogin,
} from "../controller/user";
export const UserAuth = express.Router();

UserAuth.post("/signup", handleUserSignup);

UserAuth.post("/verify-email", handleUserVAlidation);
UserAuth.post("/login", handleUserLogin);
