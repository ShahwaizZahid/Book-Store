import { Book } from "../model/BookModel";
import type { Request, Response } from "express";

export const handleGetBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (e) {
    console.log("Error in get book", e);
    res.status(500).json(e);
  }
};
