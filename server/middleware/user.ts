import { Request, Response, NextFunction } from "express";
import { session } from "../model/sessionModel";
export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.userBook;
  try {
    if (token) {
      const Session = await session.findOne({ token });
      if (!Session) res.status(401).json({ user: null });

      // @ts-ignore
      req.user = Session;
      next();
    }
  } catch (e) {
    res.status(401).json({ user: null });
  }
};
