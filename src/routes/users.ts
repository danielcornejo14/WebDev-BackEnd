import { Router } from "express";
import {createUser, deleteUser, logIn, signUp, updateProfile} from '../controllers/users'
import { jwtVerifyer } from "../middleware/jwt-verifyer";

const userRouter = Router();

userRouter.post('/login', logIn),
userRouter.post('/signup', signUp)
userRouter.post('/createUser', jwtVerifyer, createUser)
userRouter.put('/updateUser', jwtVerifyer, updateProfile)
userRouter.delete('/deleteUser', jwtVerifyer, deleteUser)

export default userRouter;