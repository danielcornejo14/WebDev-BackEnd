import { Router } from "express";
import {
    createProduct,
    getProductsByCategory,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    seedProducts,
    getProductStock,
    getProductQuantityAlert,
    seedStock,
} from "../controllers/product";
import { jwtVerifyer } from "../middleware/jwt-verifyer";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/getById", getProductById);
productRouter.post("/seedProducts", seedProducts);
productRouter.post("/seedStock", seedStock);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.post("/createProduct", jwtVerifyer, createProduct);
productRouter.put("/updateProduct", jwtVerifyer, updateProduct);
productRouter.delete("/deleteProduct", jwtVerifyer, deleteProduct);
productRouter.get("/stock", getProductStock)
productRouter.get("/quantityAlert", jwtVerifyer, getProductQuantityAlert)
productRouter.post("/restock", jwtVerifyer, getProductQuantityAlert)

export default productRouter;
