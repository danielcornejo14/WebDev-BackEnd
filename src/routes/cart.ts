import { Router } from "express";
import { addProductToCart, getCart, deleteProductFromCart } from "../controllers/cart";

const cartRouter = Router();

cartRouter.get('/', getCart);
cartRouter.post('/addProduct', addProductToCart);
cartRouter.delete('/deleteProduct/:id', deleteProductFromCart);

export default cartRouter;