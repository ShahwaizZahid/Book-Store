import express from "express";
import { handleGetBook } from "../controller/book";

export const bookRouter = express.Router();

bookRouter.get("/", handleGetBook);
