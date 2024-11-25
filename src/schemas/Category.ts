import { Schema, model } from 'mongoose';

//Category Schema (recursive)
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    subcategories: [
      { type: Schema.Types.ObjectId, ref: 'Category' } //Recursive reference 
    ],
  },
  { timestamps: true } //createdAt and updatedAt fields
);


const CategoryModel = model('Category', categorySchema);

export { CategoryModel };