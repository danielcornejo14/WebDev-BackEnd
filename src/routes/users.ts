import { Router } from "express";
import {logIn, signUp} from '../controllers/users'

const userRouter = Router();

userRouter.post('login', logIn),
userRouter.post('signup', signUp)

export default userRouter;