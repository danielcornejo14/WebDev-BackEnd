import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
    res.send('GET /products');
}

export const getProductById = async (req: Request, res: Response) => {
    res.send(`GET /products/${req.params.id}`);
}

export const createProduct = async (req: Request, res: Response) => {
    res.send('POST /products lol');
}

export const updateProduct = async (req: Request, res: Response) => {
    res.send(`PUT /products/${req.params.id}`);
}

export const deleteProduct = async (req: Request, res: Response) => {
    res.send(`DELETE /products/${req.params.id}`);
}


