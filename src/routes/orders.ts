import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, getOrdersByUserId } from "../controllers/orders"
import { Router } from "express";

const orderRouter = Router();

orderRouter.get('getAll', getAllOrders);
orderRouter.get('getOrderById/:id', getOrderById);
orderRouter.post('createOrder', createOrder);
orderRouter.patch('updateOrder/:id', updateOrder);
orderRouter.delete('deleteOrder/:id', deleteOrder);
orderRouter.get('getOrderById/:id', getOrderById);

export default orderRouter;