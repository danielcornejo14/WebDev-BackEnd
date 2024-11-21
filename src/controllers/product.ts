import { Request, Response } from "express";
import { Product } from "../models/products/product";
import { mockProducts } from "../mocks/products";
import { hasCategory } from "../helpers/product-category-search";

export const getAllProducts = async (req: Request, res: Response) => {

    // should be fetched from database
    const fetchedProducts: Product[] = mockProducts

    res.status(200).json(fetchedProducts);
}

export const getProductById = async (req: Request, res: Response) => {

    const productId = Number(req.params.id);

    // should be fetched from database
    const fetchedProduct: Product | undefined = mockProducts.find(product => product.id === productId);

    if (!fetchedProduct) {
        res.status(404).json({ message: 'Product not found' });
        return
    }

    res.status(200).json(fetchedProduct);
}

export const getProductsByCategory = async (req: Request, res: Response) => {
    
        const category = req.params.category.toLocaleLowerCase(); 
        
        // @chaldiran527 should be fetched from database
        
        const fetchedProducts: Product[] = mockProducts.filter(product => hasCategory(product, category));
        
        if (fetchedProducts.length === 0) {
            res.status(404).json({ message: 'Products not found' });
            return
        }
    
        res.status(200).json(fetchedProducts);
    }

export const createProduct = async (req: Request, res: Response) => {

    const newProduct: Product = req.body.data;
    const bearer = req.body.payload;

    if(bearer.role !== 'admin') {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    if (!newProduct) {
        res.status(400).json({ message: 'Invalid request data' });
        return
    }

    //check if product already exists in database
    const productExists = mockProducts.find(product => product.name === newProduct.name);

    if (productExists) {
        res.status(400).json({ message: 'Product already exists' });
        return
    }

    // should be saved to database
    newProduct.id = mockProducts.length + 1;
    newProduct.createdAt = new Date();
    newProduct.updatedAt = new Date();
    mockProducts.push(newProduct);

    res.status(201).json(newProduct);

}

export const updateProduct = async (req: Request, res: Response) => {

    const productId = Number(req.params.id);
    const updatedProduct: Product = req.body.data;
    const bearer = req.body.payload;

    if(bearer.role !== 'admin') {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    if (!updatedProduct) {
        res.status(400).json({ message: 'Invalid request data' });
        return
    }

    // should be fetched from database
    const productIndex = mockProducts.findIndex(product => product.id === productId);

    if (productIndex === -1) {
        res.status(404).json({ message: 'Product not found' });
        return
    }

    // should be saved to database
    mockProducts[productIndex] = {
        ...mockProducts[productIndex],
        ...updatedProduct,
        updatedAt: new Date()
    }

    res.status(200).json(mockProducts[productIndex]);

}

export const deleteProduct = async (req: Request, res: Response) => {
    
        const productId = Number(req.params.id);
        const bearer = req.body.payload;
    
        if(bearer.role !== 'admin') {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
    
        // should be fetched from database
        const productIndex = mockProducts.findIndex(product => product.id === productId);
    
        if (productIndex === -1) {
            res.status(404).json({ message: 'Product not found' });
            return
        }
    
        // should be deleted from database
        mockProducts.splice(productIndex, 1);
    
        res.status(200).json({ message: 'Product deleted' });
}


