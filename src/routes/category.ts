import { Router } from "express";
import { 
    getAllCategories, 
  //  getCategoryById, 
    seedCategories,
    deleteAllCategories,
    createCategory, 
    updateCategory, 
    deleteCategory 
} from "../controllers/category";
import { jwtVerifyer } from "../middleware/jwt-verifyer";

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories); // Fetch all categories
categoryRouter.post("/seedCategories", seedCategories); // Seed all categories
categoryRouter.delete("/deleteCategories", deleteAllCategories); // Delete all categories
categoryRouter.post('/createCategory', jwtVerifyer, createCategory); // Create a new category
categoryRouter.put('/updateCategory/:id', jwtVerifyer, updateCategory); // Update an existing category
categoryRouter.delete('/deleteCategory/:id', jwtVerifyer, deleteCategory); // Delete a category

export default categoryRouter;