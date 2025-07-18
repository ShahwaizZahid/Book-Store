import type { Request, Response } from "express";
import { User } from "../model/UserModel";
import { session } from "../model/sessionModel";
import { sendVerificationEmail } from "./sendEmail";

import { isValidEmail } from "../services/validEmail";
const MIN_PASSWORD_LENGTH = process.env.MIN_PASSWORD_LENGTH;
import { ValidationCodeModel } from "../model/validationModel";
import { comparePassword, hashPassword } from "../services/Auth";

export async function handleUserSignup(req: Request, res: Response) {
  console.log(req.body);

  try {
    const { email = "", password = "", name = "" } = req.body;

    console.log(email, password, name);

    const exists = await User.findOne({ email });
    if (exists && !exists.verified) {
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
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (!user.verified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    const compare = await comparePassword(password, user.password);

    if (!compare) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Clear any existing sessions for this user
    await session.deleteMany({ userId: user._id });

    const token = user._id.toString();
    const newSession = await session.create({
      userId: user._id,
      token,
    });

    res
      .cookie("userBook", token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          verified: user.verified,
        },
      });

    console.log("Successfully logged in and created session");
  } catch (err) {
    console.error("Error while logging in: ", err);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const handleUserVAlidation = async (req: Request, res: Response) => {
  const { email = "", otp: validationCode = "" } = req.body;
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
  } catch (e) {
    console.log("validation", e);
    res.status(400).json({ message: "User does not exist." });
  }

  await ValidationCodeModel.deleteOne({ email, code: validationCode });

  res.status(200).json({ message: "Email verified successfully." });
};

export const handleReSendOtp = async (req: Request, res: Response) => {
  const { email = "", otp: validationCode = "" } = req.body;
  const validationData = await ValidationCodeModel.findOne({ email: email });
  if (validationData) {
    console.log("hava ");
    await ValidationCodeModel.deleteOne({ email });
  }
  console.log("del");
  const validationCodeDoc = new ValidationCodeModel({
    email,
    code: Math.floor(100000 + Math.random() * 900000),
    expiration: new Date(Date.now() + 3600000),
  });
  try {
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
};

export const handleMe = async (req: Request, res: Response) => {
  try {
    const userToken = req.cookies.userBook;

    if (!userToken) {
      return res.status(401).json({
        success: false,
        user: null,
        message: "No authentication token found",
      });
    }

    const foundSession = await session
      .findOne({ token: userToken })
      .populate("userId", "name email verified");

    if (!foundSession) {
      return res.status(401).json({
        success: false,
        user: null,
        message: "Invalid or expired session",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        token: foundSession.token,
        userId: foundSession.userId,
        sessionId: foundSession._id,
      },
    });
  } catch (e) {
    console.error("Error in handleMe:", e);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: "Failed to authenticate user",
    });
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("userBook", {
      secure: true,
      sameSite: "none",
    });

    const result = await session.deleteOne({ token: req.body.userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Session not found" });
    }

    console.log("Successfully logged out");

    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
