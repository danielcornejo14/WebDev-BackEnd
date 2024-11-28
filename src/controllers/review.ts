import { Request, Response, NextFunction } from "express";
import { ReviewModel } from "../schemas/Review";
import mongoose from "mongoose";
import { ProductModel } from "../schemas/Product";

// Create a review
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId, userId, rating, comment } = req.body.data;
    
    // console.log(req.body.data);

    if (!productId || !userId || !rating) {
      res.status(400).json({ message: "Product, User and Rating are required" });
      return;
    }

    // Check if the product exists
    const productExists = await ProductModel.findById(productId);
    if (!productExists) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    
    const newReview = new ReviewModel({
        product: productId, // 
        user: userId,       
        rating,
        comment,
      });
    
    // Save the review
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error creating review:", error);
    next(error);
  }
};


// Get all reviews
export const getAllReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const reviews = await ReviewModel.find().populate("product user");
  
      if (!reviews || reviews.length === 0) {
        res.status(404).json({ message: "No reviews found" });
        return;
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      next(error);
    }
};
  

export const getReviewById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const reviewId = req.params.id;
  
      // Check if the reviewId is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(400).json({ message: "Invalid ID review" });
        return;
      }
  
      // Find the review by ID and populate the product and user fields
      const review = await ReviewModel.findById(reviewId).populate("product user");
  
      if (!review) {
        res.status(404).json({ message: "Review has not been found" });
        return;
      }
  
      // Return the review
      res.status(200).json(review);
    } catch (error) {
      console.error("Error fetching the review by ID:", error);
      next(error);
    }
};

// Get reviews by product
export const getReviewsByProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const productId = req.params.productId;
  
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: "Invalid product ID" });
        return;
      }
  
      const reviews = await ReviewModel.find({ product: productId }).populate("user");
  
      if (!reviews || reviews.length === 0) {
        res.status(404).json({ message: "No reviews found for this product" });
        return;
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews by product:", error);
      next(error);
    }
};
  
  // Update a review
export const updateReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const reviewId = req.params.id;
      const updatedReviewData = req.body.data;
  
      if (!updatedReviewData || Object.keys(updatedReviewData).length === 0) {
        res.status(400).json({ message: "Invalid request data" });
        return;
      }
  
      const updatedReview = await ReviewModel.findByIdAndUpdate(
        reviewId,
        { ...updatedReviewData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
  
      if (!updatedReview) {
        res.status(404).json({ message: "Review not found" });
        return;
      }
  
      res.status(200).json(updatedReview);
    } catch (error) {
      console.error("Error updating review:", error);
      next(error);
    }
};
  
// Delete a review
export const deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const reviewId = req.params.id;
  
      const reviewToDelete = await ReviewModel.findById(reviewId);
  
      if (!reviewToDelete) {
        res.status(404).json({ message: "Review not found" });
        return;
      }
  
      await ReviewModel.findByIdAndDelete(reviewId);
  
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error("Error deleting review:", error);
      next(error);
    }
};