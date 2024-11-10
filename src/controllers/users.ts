import {Request, Response} from 'express';

export const logIn = async (req: Request, res: Response) => {
    res.send('POST /login');
};

export const signUp = async (req: Request, res: Response) => {
    res.send('POST /signup');
};
