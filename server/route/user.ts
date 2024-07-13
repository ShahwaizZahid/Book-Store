import express from "express";
import {
  handleUserSignup,
  handleUserVAlidation,
  handleUserLogin,
  handleReSendOtp,
  handleMe,
  handleLogout,
} from "../controller/user";

export const UserAuth = express.Router();

UserAuth.post("/signup", handleUserSignup);

UserAuth.post("/verify-email", handleUserVAlidation);
UserAuth.post("/login", handleUserLogin);
UserAuth.post("/Otp-again", handleReSendOtp);
UserAuth.get("/me", handleMe);
UserAuth.post("/logout", handleLogout);
