import type { Request, Response } from "express";
import { User } from "../model/UserModel";
import { session } from "../model/sessionModel";
import { sendVerificationEmail } from "./sendEmail";

import { isValidEmail } from "../services/validEmail";
const MIN_PASSWORD_LENGTH = process.env.MIN_PASSWORD_LENGTH;
import { ValidationCodeModel } from "../model/validationModel";
import { comparePassword, hashPassword } from "../services/Auth";

export async function handleUserSignup(req: Request, res: Response) {
  try {
    const { email = "", password = "", name = "" } = req.body;

    const exists = await User.findOne({ email });
    if (exists && !exists.verified) {
      await User.deleteOne({ email });
      await ValidationCodeModel.deleteOne({ email });
      return res.status(400).json({
        message: "Email already exists and not verified. Register again.",
      });
    }

    if (exists) {
      return res.status(400).json({ message: "Email already exists." });
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid password" });
    }

    const validationCodeDoc = new ValidationCodeModel({
      email,
      code: Math.floor(100000 + Math.random() * 900000),
      expiration: new Date(Date.now() + 3600000),
    });

    const hashingPassword = await hashPassword(password);
    console.log(hashingPassword);
    try {
      const user = await User.create({
        name: name,
        email: email,
        password: hashingPassword,
        verified: false,
      });
      await validationCodeDoc.save();
    } catch {
      return res.status(500).json({ message: "Server error" });
    }

    try {
      await sendVerificationEmail({
        email,
        validationCode: validationCodeDoc.code,
      });
      res.status(200).json({ message: "Email sent successfully." });
      console.log("successfully sent email");
    } catch (err) {
      console.error("Error while logging in: ", err);
      return res.status(500).json({
        message: "Error while sending email. Make sure it is a valid email.",
      });
    }

    console.log("Successfully Signup");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "An error occurred while signing up" });
  }
}

export const handleUserLogin = async (req: Request, res: Response) => {
  const { email = "", password = "" } = req.body;

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid username " });
    }
    console.log(user?.password);
    const compare = await comparePassword(password, user?.password);

    console.log(compare);
    if (!compare) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    const token = user._id;
    const Session = await session.create({
      userId: user._id,
      token,
    });

    res
      .cookie("user", token, {
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "login successfully", user });

    console.log("successfully login and create session in mongodb");
  } catch (err) {
    console.error("Error while logging in: ", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const handleUserVAlidation = async (req: Request, res: Response) => {
  const { email = "", otp: validationCode = "" } = req.body;
  console.log(req.body);
  const validationData = await ValidationCodeModel.findOne({
    email,
    code: validationCode,
    expiration: { $gt: new Date() },
  });

  if (!validationData) {
    return res
      .status(400)
      .json({ message: "Invalid or expired validation code." });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.verified = true;
      await user.save();
    }
  } catch {
    res.status(400).json({ message: "User does not exist." });
  }

  await ValidationCodeModel.deleteOne({ email, code: validationCode });

  res.status(200).json({ message: "Email verified successfully." });
};
