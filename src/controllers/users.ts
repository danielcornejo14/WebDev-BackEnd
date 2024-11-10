import {Request, Response} from 'express';
import { generateJwt } from '../helpers/generate-jwt';
import { User } from '../models/users/user';
import exp from 'constants';

export const logIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // Here you should check if the user exists in the database

    // Mock user should be replaced with a database query result
    const mockUser:User = {
        id: 1,
        email: 'test@test.com',
        password: 'test',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const token = await generateJwt(mockUser);
    res.status(200).send(token);
};

export const signUp = async (req: Request, res: Response) => {
    res.send('POST /signup');
};

export const updateProfile = async (req: Request, res: Response) => {
    const updatedUser: User = req.body.data;
    const payload  = req.body.payload;
    console.log(req.body);

    // Here you should check if the user exists in the database
    const mockUser:User = req.body as User;
    console.log(mockUser);    

    if (!updatedUser || !updatedUser.id) {
        res.status(400).send('Invalid user data')
        return;
    }

    if(mockUser.id !== payload.id && payload.role !== 'admin'){
        res.status(403).send('Forbidden');
        return;
    }



    updatedUser.updatedAt = new Date();

    // Here you should update the user in the database
    //after the update, you should return the updated user

    res.status(200).send(updatedUser);
}

export const deleteUser = async (req: Request, res: Response) => {
    const payload  = req.body.payload;
    console.log(req.body);

    // Here you should check if the user exists in the database
    const mockUser:User = req.body as User;
    console.log(mockUser);    

    if (!mockUser || !mockUser.id) {
        res.status(400).send('Invalid user data')
        return;
    }

    if(mockUser.id !== payload.id && payload.role !== 'admin'){
        res.status(403).send('Forbidden');
        return;
    }

    // Here you should delete the user from the database
    res.status(200).send('User deleted');
}

export const createUser = async (req: Request, res: Response) => {
    const newUser: User = req.body.data;
    const payload  = req.body.payload;
    console.log(req.body);

    // Here you should check if the user exists in the database
    const mockUser:User = req.body as User;
    console.log(mockUser);    

    if (!newUser || !newUser.id) {
        res.status(400).send('Invalid user data')
        return;
    }

    if(payload.role !== 'admin'){
        res.status(403).send('Forbidden');
        return;
    }

    // Here you should create the user in the database
    //after the creation, you should return the created user

    res.status(200).send(newUser);
}