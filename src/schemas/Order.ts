import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const orderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ 
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true }, // e.g., 'tarjeta de crédito', 'paypal'
  status: { 
    type: String, 
    required: true, 
    enum: ['pendiente', 'en preparación', 'enviado', 'entregado'], 
    default: 'pendiente' 
  }
}, { timestamps: true });

export type OrderT = InferSchemaType<typeof orderSchema>;

export default mongoose.model("Order", orderSchema);
