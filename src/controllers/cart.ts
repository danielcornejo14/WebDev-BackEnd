import { NextFunction, Request, Response } from 'express';
import { Cart } from '../models/cart/Cart';
import { mockCart } from '../mocks/cart';
import { CartModel } from '../schemas/Cart';
import { User } from '../models/users/user';
import  UserModel  from '../schemas/User';
import { ProductModel } from '../schemas/Product';
import { Types } from 'mongoose';
import { Product } from '../models/products/product';
import { StockModel } from '../schemas/Stock';
import { OrderModel } from '../schemas/Order';
import { Order } from '../models/orders/order';

export const createCartsForAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Delete all existing carts before creating new ones
        await CartModel.deleteMany({});

        // Get all users from the database
        const users = await UserModel.find();

        if (!users || users.length === 0) {
            res.status(404).send('No users found');
            return;
        }

        // Loop through all users and create a cart for each one
        for (const user of users) {
            // Create a new empty cart for the user
            const cart = new CartModel({
                userId: user._id, // Use the user's _id
                products: [], // Empty initially
            });

            // Save the cart to the database
            await cart.save();
        }

        // Respond with success message
        res.status(200).send('Carts deleted and created/verified for all users');
    } catch (error) {
        // Pass the error to the error handler middleware
        next(error);
    }
};


export const addProductToCart = async (req: Request, res: Response): Promise<void> => {
    const { productId, quantity } = req.body.data;
    const userId = req.body.payload.id;

    if (!userId || !productId || !quantity) {
        res.status(400).send('Missing required fields');
        return;
    }

    try {
        // Find the user's cart
        let cart = await CartModel.findOne({ userId }).populate({
            path: 'products.productId',
            select: 'name price' // Populate product details
        });

        if (!cart) {
            // Create a new cart if one doesn't exist
            cart = new CartModel({ userId, products: [] });
        }

        // Check if the product is already in the cart
        const existingProductIndex = cart.products.findIndex(
            (productInCart: any) =>
                productInCart.productId &&
                productInCart.productId._id.toString() === productId
        );

        if (existingProductIndex !== -1) {
            // Update quantity if product exists
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Add new product if it doesn't exist
            cart.products.push({ productId, quantity });
        }

        // Save the updated cart
        await cart.save();

        // Populate product details again for the response
        const populatedCart = await CartModel.findById(cart._id).populate({
            path: 'products.productId',
            select: 'name price'
        });

        if (!populatedCart) {
            res.status(500).send('Failed to retrieve updated cart');
            return;
        }

        // Format the response
        const formattedCart = {
            userId: populatedCart.userId,
            products: populatedCart.products.map((item: any) => ({
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.quantity
            }))
        };

        res.status(200).json(formattedCart);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding the product to the cart');
    }
};


export const getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract the userId from the request body
        const userId  = req.body.payload.id;
        console.log(userId);
        // Validate that the userId is present
        if (!userId) {
            res.status(400).send('User id not present');
            return;
        }

        // Fetch the user's cart from the database
        const cart = await CartModel.findOne({ userId }).populate({
            path: 'products',  // Assuming products in the cart are stored by their ObjectId in the CartModel
            select: 'name price description image brand category createdAt updatedAt'  // Fields to populate for products
        });

        // If the cart is not found, send a 404 response
        if (!cart) {
            res.status(404).send('Cart not found for this user');
            return;
        }

        // Return the populated cart
        res.status(200).json({
            id: cart._id,
            userId: cart.userId,
            products: cart.products, // The populated products
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt
        });

    } catch (error) {
        // Handle any unexpected errors and pass to the error handler middleware
        next(error);
    }
};

export const deleteProductFromCart = async (req: Request, res: Response): Promise<void> => {
    // Access productId and userId directly from req.body
    const { productId } = req.body.data;  // Expecting productId and userId to be at the root level of req.body
    const userId = req.body.payload.id;

    // Check if productId and userId are provided in the request body
    if (!userId) {
        res.status(400).send('User ID not present in the request');
        return;
    }

    if (!productId) {
        res.status(400).send('Product ID not provided');
        return;
    }

    try {
        // Convert productId to ObjectId to ensure comparison works correctly
        const productObjectId = new Types.ObjectId(productId);

        // Find the user's cart by userId and populate the product details
        const cart = await CartModel.findOne({ userId }).populate({
            path: 'products.productId',
            select: 'name price',
        });

        // If the cart is not found
        if (!cart) {
            res.status(404).send('Cart not found');
            return;
        }

        // Find the product in the cart's products array by comparing ObjectId
        const productIndex = cart.products.findIndex((product: any) => product.productId._id.toString() === productObjectId.toString());

        // If the product is not found, send an error
        if (productIndex === -1) {
            res.status(404).send('Product not found in cart');
            return;
        }

        // Remove the product from the cart's products array
        cart.products.splice(productIndex, 1);

        // Save the updated cart to the database
        await cart.save();

        // Format the response to remove the deleted product
        const formattedCart = {
            userId: cart.userId,
            products: cart.products.map((item: any) => ({
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.quantity,
            })),
        };

        // Return the updated cart
        res.status(200).json(formattedCart);
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).send('An error occurred while deleting the product from the cart');
    }
};

export const checkoutCart = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    
    // const userId = req.body.payload.id;  // Extract userId from the payload
    const { userId, paymentMethod } = req.body.data;  // Extract payment method

    if (!userId) {
        res.status(401).send('Unauthorized');
        return;
    }

    if (!paymentMethod) {
        res.status(400).send('Missing payment method');
        return;
    }

    try {
        // Fetch the user's cart from the database
        const cart = await CartModel.findOne({ userId }).populate({
            path: 'products.productId',
            select: 'name price discount' // Include the discount field
        });

        if (!cart) {
            res.status(404).send('Cart not found for this user');
            return;
        }

        const products = cart.products;
        let total = 0;

        // Iterate through the products in the cart to check stock, apply discounts, and calculate the total price
        for (const productInCart of products) {
            const { productId, quantity } = productInCart;
            const foundProduct = await ProductModel.findById(productId);
            const productStock = await StockModel.findOne({ productId });

            if (!foundProduct) {
                res.status(404).send(`Product with ID ${productId} not found`);
                return;
            }

            if (!productStock) {
                res.status(404).send(`Stock not found for product with ID ${productId}`);
                return;
            }

            // Check if the quantity in stock is sufficient
            if (productStock.quantity < quantity) {
                res.status(400).send(`Not enough stock for product ${foundProduct.name}`);
                return;
            }

            // Apply the discount on the product price (if available)
            const discountedPrice = foundProduct.price * (1 - foundProduct.discount / 100);

            // Add to the total price
            total += discountedPrice * quantity;

            // Update the stock quantity
            productStock.quantity -= quantity;
            await productStock.save();
        }

        // Create a new order for the user
        const order = new OrderModel({
            userId,
            products,
            total,
            paymentMethod,
            status: 'pending',
        });

        // Save the order to the database
        const newOrder = await order.save();

        // Empty the user's cart by clearing the products array
        cart.products.splice(0, cart.products.length);  
        await cart.save();  // Save the updated cart (now empty)

        // Return the new order details
        res.status(200).json(newOrder);

    } catch (error) {
        console.error('Error checking out cart:', error);
        res.status(500).send('An error occurred while checking out the cart');
    }
};
