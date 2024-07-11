import mongoose, { model, Schema } from "mongoose";

const validatioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  expiration: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
});

export const ValidationCodeModel = mongoose.model(
  "ValidationCode",
  validatioSchema
);
