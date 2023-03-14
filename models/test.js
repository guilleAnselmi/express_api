import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: { type: String },
});

export default mongoose.model("Test", schema);
