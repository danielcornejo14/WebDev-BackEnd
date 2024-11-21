import { Router } from "express";
import {
    createProduct,
    getProductsByCategory,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "../controllers/product";
import { jwtVerifyer } from "../middleware/jwt-verifyer";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.post("/createProduct", jwtVerifyer, createProduct);
productRouter.put("/updateProduct/:id", jwtVerifyer, updateProduct);
productRouter.delete("/deleteProduct/:id", jwtVerifyer, deleteProduct);

export default productRouter;
