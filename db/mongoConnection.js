import mongoose from "mongoose";

const mongoDbConnection = () => {
  return mongoose.connect(
    `${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`
  );
};
export default mongoDbConnection;
