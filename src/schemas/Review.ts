import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const reviewSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, { timestamps: true });

export type ReviewT = InferSchemaType<typeof reviewSchema>;

export default mongoose.model("Review", reviewSchema);
