import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    productImages: { type: Array, default: [] },
    productClass: { type: Number, min: 0, max: 20, default: 0 },
    model: { type: String },
    ofert: { type: Number, min: 0, max: 100 }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Product', schema)

/**
 * CLASES
 * 0 - default
 * 1 - mesas y escritorios
 * 2 - sillas y sillones
 * 3 - tablas y cosas para el asado
 * 4 - adornos y decoración
 * 5 - camping y jardin
 *
 */
