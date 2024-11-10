import { Request, Response } from "express";

export const getAllOrders = async (req: Request, res: Response) => {
    res.send('GET /orders');
}

export const getOrderById = async (req: Request, res: Response) => {
    res.send(`GET /orders/${req.params.id}`);
}

export const createOrder = async (req: Request, res: Response) => {
    res.send('POST /orders');
}

export const updateOrder = async (req: Request, res: Response) => {
    res.send(`PUT /orders/${req.params.id}`);
}

export const deleteOrder = async (req: Request, res: Response) => {
    res.send(`DELETE /orders/${req.params.id}`);
}

export const getOrdersByUserId = async (req: Request, res: Response) => {
    res.send(`GET /orders/user/${req.params.id}`);
}
