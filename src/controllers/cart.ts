import { Request, Response } from 'express';
import { Cart } from '../models/cart/Cart';
import { mockCart } from '../mocks/cart';

export const addProductToCart = async (req: Request, res: Response) => {

    const bearer = req.body.payload;
    const newProduct = req.body.data;

    if(!bearer){
        res.status(400).send('Bearer token not present');
        return;
    }

    if(!bearer.id){
        res.status(400).send('User id not present');
        return;
    }

    //get cart from db
    let cart: Cart = mockCart;
    
    if (!cart) {
        
        cart = {
            userId: bearer.id,
            products: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
    }

    //add product to cart
    cart.products.push(newProduct);

    //save cart to db
    //await cart.save();


    res.status(200).json(cart);
}

export const getCart = async (req: Request, res: Response) => {

    const bearer = req.body.payload;

    if(!bearer){
        res.status(400).send('Bearer token not present');
        return;
    }

    if(!bearer.id){
        res.status(400).send('User id not present');
        return;
    }

    //get cart from db
    let cart: Cart = mockCart;

    if (!cart) {
        
        cart = {
            userId: bearer.id,
            products: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        //save cart to db
        //await cart.save();
        
    }

    res.status(200).json(cart);

}

export const deleteProductFromCart = async (req: Request, res: Response) => {
    
        const bearer = req.body.payload;
        const {productId} = req.body.data;
    
        if(!bearer){
            res.status(400).send('Bearer token not present');
            return;
        }
    
        if(!bearer.id){
            res.status(400).send('User id not present');
            return;
        }
    
        //get cart from db
        let cart: Cart = mockCart;
    
        if (!cart) {
            
            cart = {
                userId: bearer.id,
                products: [],
                createdAt: new Date(),
                updatedAt: new Date()
            };
    
            //save cart to db
            //await cart.save();
            
        }
    
        //delete product from cart
        cart.products = cart.products.filter(product => product.id !== productId);
    
        //save cart to db
        //await cart.save();
    
        res.status(200).json(cart);
}
