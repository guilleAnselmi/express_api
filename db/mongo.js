import mongoose from "mongoose";

export const mongoDbConnection = () => {
  return mongoose.connect(process.env.MONGODB_URL);
};
