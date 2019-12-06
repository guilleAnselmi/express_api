import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  test: { type: String }
});

export default mongoose.model('Test', schema);
