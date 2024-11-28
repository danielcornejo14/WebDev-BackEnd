import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },       // Reference to User
    rating: { type: Number, required: true, min: 1, max: 5 },                // Rating (1-5)
    comment: { type: String },                                              
  },
  { timestamps: true } // createdAt and updatedAt
);

const ReviewModel = model('Review', reviewSchema);

export { ReviewModel };