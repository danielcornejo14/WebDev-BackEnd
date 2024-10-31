import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  specifications: { type: String, required: true },
  images: [{ type: String }], // URLs
  stock: { type: Number, required: true, default: 0 },
  discount: { type: Number, default: 0 }, // Discount percentage
}, { timestamps: true });

export type ProductT = InferSchemaType<typeof productSchema>;

export default mongoose.model("Product", productSchema);
