import { Book } from "../model/BookModel";
import type { Request, Response } from "express";

export const handleGetBook = async (req: Request, res: Response) => {
  try {
    console.log("find");
    const book = await Book.find();
    console.log(book);
    res.status(200).json(book);
  } catch (e) {
    console.log("Error in get book", e);
    res.status(500).json(e);
  }
};
