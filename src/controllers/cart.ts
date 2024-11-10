import { Request, Response } from 'express';

export const addProductToCart = async (req: Request, res: Response) => {
    res.send('POST /cart');
}

export const getCart = async (req: Request, res: Response) => {
    res.send('GET /cart');
}

export const deleteProductFromCart = async (req: Request, res: Response) => {
    res.send(`DELETE /cart/${req.params.id}`);
}
