import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const cartSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }],
}, { timestamps: true });

export type CartT = InferSchemaType<typeof cartSchema>;

export default mongoose.model("Cart", cartSchema);