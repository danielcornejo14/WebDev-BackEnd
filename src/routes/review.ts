import { Router } from "express";
import {
    createReview,
    getAllReviews,
    getReviewsByProduct,
    updateReview,
    deleteReview,
    getReviewById,
} from "../controllers/review";
import { jwtVerifyer } from "../middleware/jwt-verifyer";

const reviewRouter = Router();

reviewRouter.get("/", getAllReviews); //Get  all reviews
reviewRouter.get("/:id", getReviewById); //Get review by id
reviewRouter.get("/product/:productId", getReviewsByProduct); // Get reviews by product
reviewRouter.post("/createReview", jwtVerifyer, createReview); // Create a review
reviewRouter.put("/updateReview/:id", jwtVerifyer, updateReview);  // Update a review
reviewRouter.delete("/deleteReview/:id", jwtVerifyer, deleteReview);  // Delete a review

export default reviewRouter;