import mongoose from "mongoose";
export async function connectToMongo(url: string) {
  return mongoose.connect(url);
}
