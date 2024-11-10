import { Request, Response } from 'express';

export const addProductToCart = async (req: Request, res: Response) => {
    const queryParams = req.query
    if(!queryParams.userId){
        res.status(400).send('Query param: \'userId\' not present')
        return;
    }


    res.status(200).send(queryParams.userId);
}

export const getCart = async (req: Request, res: Response) => {

    const queryParams = req.query
    if(!queryParams.userId){
        res.status(400).send('Query param: \'userId\' not present');
        return;
    }


    res.status(200).send(queryParams.userId);
}

export const deleteProductFromCart = async (req: Request, res: Response) => {
    const queryParams = req.query
    if(!queryParams.userId){
        res.status(400).send('Query param: \'userId\' not present')
        return;
    }
    if(!queryParams.productId){
        res.status(400).send('Query param: \'productId\' not present')
        return;
    }

    res.status(200).send(queryParams.userId);
}
