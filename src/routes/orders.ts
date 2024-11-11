import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, getOrdersByUserId } from "../controllers/orders"
import { Router } from "express";
import { jwtVerifyer } from "../middleware/jwt-verifyer";
import { adminVerifyer } from "../middleware/admin-verifyer";

const orderRouter = Router();

orderRouter.get('/', jwtVerifyer, adminVerifyer, getAllOrders);
orderRouter.get('/:id', jwtVerifyer, getOrderById);
orderRouter.get('/getOrdersByUserId/:id', jwtVerifyer, getOrdersByUserId);
orderRouter.post('/createOrder', jwtVerifyer, createOrder);
orderRouter.put('/updateOrder/:id', jwtVerifyer, updateOrder);
orderRouter.delete('/deleteOrder/:id', jwtVerifyer, deleteOrder);

export default orderRouter;