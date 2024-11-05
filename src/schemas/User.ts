import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true, enum: [0, 1, 2] }, // 0: user, 1: admin, 2: logistic
  purchaseHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }] // Reference orders
}, { timestamps: true });

export type UserT = InferSchemaType<typeof userSchema>;

export default mongoose.model("User", userSchema);
