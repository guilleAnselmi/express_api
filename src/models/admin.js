import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, default: 1 } // 1- GENERAL_AMDIN
})

export default mongoose.model('Admin', schema)
