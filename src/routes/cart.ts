import { Router } from "express";
import { addProductToCart, getCart, deleteProductFromCart, createCartsForAllUsers } from "../controllers/cart";
import { jwtVerifyer } from "../middleware/jwt-verifyer";

const cartRouter = Router();

cartRouter.get('/', jwtVerifyer, getCart);
cartRouter.post('/createCartsForUsers', createCartsForAllUsers);
cartRouter.post('/addProduct', jwtVerifyer, addProductToCart);
cartRouter.delete('/deleteProduct', jwtVerifyer, deleteProductFromCart);

export default cartRouter;