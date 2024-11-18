import { Router } from "express";
import {
    createUser,
    deleteUser,
    logIn,
    signUp,
    updateProfile,
    getUser,
    getAllUsers,
} from "../controllers/users";
import { jwtVerifyer } from "../middleware/jwt-verifyer";

const userRouter = Router();

userRouter.post("/login", logIn), 
userRouter.post("/signup", signUp);
userRouter.post("/createUser", jwtVerifyer, createUser);
userRouter.put("/updateUser", jwtVerifyer, updateProfile);
userRouter.delete("/deleteUser", jwtVerifyer, deleteUser);
userRouter.get("/getUserById", jwtVerifyer, getUser);
userRouter.get("/getAllUsers", jwtVerifyer, getAllUsers);

export default userRouter;
