import { Schema, model, InferSchemaType } from 'mongoose';

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'customer', 'user', 'logistics'] }, // Keep roles simple
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

export type UserT = InferSchemaType<typeof userSchema>; // Export the type inferred from schema

export default model<UserT>('User', userSchema); // The actual User model for database interaction
