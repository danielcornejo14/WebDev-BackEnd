import { Router } from "express";
import { addProductToCart, getCart, deleteProductFromCart } from "../controllers/cart";
import { jwtVerifyer } from "../middleware/jwt-verifyer";

const cartRouter = Router();

cartRouter.get('/', jwtVerifyer, getCart);
cartRouter.post('/addProduct', jwtVerifyer, addProductToCart);
cartRouter.delete('/deleteProduct', jwtVerifyer, deleteProductFromCart);

export default cartRouter;