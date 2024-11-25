import { Request, Response, NextFunction } from "express";
import { Order } from "../models/orders/order";
import { mockOrders } from "../mocks/orders";
import { CreditCardModel } from '../schemas/CreditCard';
import { OrderModel } from '../schemas/Order';
import { User } from '../models/users/user';
import  UserModel  from '../schemas/User';

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get all orders from the database
        const orders = await OrderModel.find();  // Populate userId to show user details

        if (!orders || orders.length === 0) {
            // If no orders found in the database
            res.status(404).json({ message: 'No orders found' });
            return;
        }

        // Return the found orders
        res.status(200).json(orders);
    } catch (error) {
        // Catch and handle errors
        console.error('Error fetching orders:', error);
    }
};


export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: orderId } = req.params;

        // Validate if orderId is provided
        if (!orderId) {
            res.status(400).json({ message: 'Order ID is required in params' });
            return;
        }

        // Find the order by orderId (Note: in MongoDB, _id is an ObjectId type, so we need to convert to ObjectId)
        const order = await OrderModel.findById(orderId).populate('userId', '_id'); // Populating only the userId field

        // Check if the order exists
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // Format the response as per your requirement
        const formattedOrder = {
            id: order._id, // Convert MongoDB ObjectId to a string
            userId: order.userId._id, // Only userId (_id)
            total: order.total,
            paymentMethod: order.paymentMethod,
            status: order.status,
            createdAt: order.createdAt, // Ensure it's a Date object
            updatedAt: order.updatedAt, // Ensure it's a Date object
        };

        // Return the formatted order
        res.status(200).json(formattedOrder);

    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'An error occurred while fetching the order' });
    }
};


export const createOrder = async (req: Request, res: Response): Promise<void> => {
    // Access order data from the request body
    const orderData: Order = req.body.data;

    // Validate the presence of order data in the request body
    if (!orderData) {
        res.status(400).json({ message: 'Order data is required in the body' });
        return;
    }

    try {
        // Create a new order document using Mongoose
        const newOrder = new OrderModel({
            userId: orderData.userId,
            total: orderData.total,
            paymentMethod: orderData.paymentMethod,
            status: orderData.status,
        });

        // Save the order to the database
        await newOrder.save();

        // Respond with the created order
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
};


export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: orderId } = req.params;

        // Validate if orderId is provided
        if (!orderId) {
            res.status(400).json({ message: 'Order ID is required in params' });
            return;
        }

        // Ensure order data is provided in the request body
        const { userId, total, paymentMethod, status } = req.body.data;

        if (!userId || !total || !paymentMethod || !status) {
            res.status(400).json({ message: 'Order data is required in body' });
            return;
        }

        // Find and update the order by orderId
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId, // Order ID to find the document
            {
                userId, // Update the fields
                total,
                paymentMethod,
                status
            },
            { new: true } // Return the updated document
        ).populate('userId', '_id'); // Optionally populate userId to return only the _id

        // If no order is found, return a 404 error
        if (!updatedOrder) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // Format the response to match the required structure
        const formattedOrder = {
            id: updatedOrder._id,
            userId: updatedOrder.userId._id, // Only include userId as _id
            total: updatedOrder.total,
            paymentMethod: updatedOrder.paymentMethod,
            status: updatedOrder.status,
            createdAt: updatedOrder.createdAt,
            updatedAt: updatedOrder.updatedAt,
        };

        // Return the updated order
        res.status(200).json(formattedOrder);

    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'An error occurred while updating the order' });
    }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: orderId } = req.params;

        // Validate if orderId is provided
        if (!orderId) {
            res.status(400).json({ message: 'Order ID is required in params' });
            return;
        }

        // Find the order by orderId to ensure it exists
        const order = await OrderModel.findById(orderId);
        
        // If the order is not found, return a 404 error
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // Delete the order from the database
        await OrderModel.findByIdAndDelete(orderId);

        // Return a success message after deleting the order
        res.status(200).json({ message: 'Order deleted successfully' });

    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'An error occurred while deleting the order' });
    }
};

export const getOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: userId } = req.params; // Destructure userId from route parameters

        if (!userId) {
            res.status(400).json({ message: 'User ID is required in params' });
            return;
        }

        // Query the database for orders belonging to the user
        const orders = await OrderModel.find({ userId }).populate('userId', '_id'); // Populating only the userId field

        // If no orders are found, return a 404
        if (orders.length === 0) {
            res.status(404).json({ message: 'No orders found for this user' });
            return;
        }

        // Format the orders as per the required structure
        const formattedOrders = orders.map(order => ({
            id: order._id, // Convert MongoDB ObjectId to string
            userId: order.userId._id, // Only return userId
            total: order.total,
            paymentMethod: order.paymentMethod,
            status: order.status,
            createdAt: order.createdAt, // Date object
            updatedAt: order.updatedAt, // Date object
        }));

        // Return the formatted orders
        res.status(200).json(formattedOrders);

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'An error occurred while fetching orders for this user' });
    }
};