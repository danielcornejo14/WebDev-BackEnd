import { Request, Response } from "express";
import { Order } from "../models/orders/order";
import { mockOrders } from "../mocks/orders";

export const getAllOrders = async (req: Request, res: Response) => {

    //get orders from database
    const orders: Order[] = mockOrders;

    if(!orders){
        res.status(404).json({message: 'No orders found'});
        return;
    }

    res.status(200).json(orders);

}

export const getOrderById = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    if (!orderId) {
        res.status(400).json({ message: 'Order ID is required in params' });
        return;
    }

    //get order from database
    const order: Order | undefined = mockOrders.find(order => order.id === parseInt(orderId));

    if(!order){
        res.status(404).json({message: 'Order not found'});
        return;
    }

    res.status(200).json(order);
}

export const createOrder = async (req: Request, res: Response) => {
    
    const order: Order = req.body.data;

    if(!order){
        res.status(400).json({message: 'Order data is required in body'});
        return;
    }

    //save order to database
    mockOrders.push(order);

    res.status(201).json(order);
}

export const updateOrder = async (req: Request, res: Response) => {
    
    const { orderId } = req.params;

    if (!orderId) {
        res.status(400).json({ message: 'Order ID is required in params' });
        return;
    }

    const order: Order = req.body.data;

    if(!order){
        res.status(400).json({message: 'Order data is required in body'});
        return;
    }

    //update order in database
    const index = mockOrders.findIndex(order => order.id === parseInt(orderId));
    mockOrders[index] = order;


    res.status(200).json(order);

}

export const deleteOrder = async (req: Request, res: Response) => {

    const { orderId } = req.params;

    if (!orderId) {
        res.status(400).json({ message: 'Order ID is required in params' });
        return;
    }

    if(!mockOrders.find(order => order.id === parseInt(orderId))){
        res.status(404).json({message: 'Order not found'});
        return;
    }

    //delete order from database
    const index = mockOrders.findIndex(order => order.id === parseInt(orderId));
    mockOrders.splice(index, 1);

    res.status(204).json({message: 'Order deleted'});

}

export const getOrdersByUserId = async (req: Request, res: Response) => {

    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({ message: 'User ID is required in params' });
        return;
    }

    //get orders from database
    const orders: Order[] = mockOrders.filter(order => order.userId === parseInt(userId));

    if(!orders){
        res.status(404).json({message: 'No orders found'});
        return;
    }

    res.status(200).json(orders);
}
