import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { environment } from "../helpers/environment";

export const adminVerifyer = async (req: Request, res: Response, next: NextFunction) => {


    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send({ error: "No token provided" });
        return;
    }

    try {
        const { payload } = await jwtVerify(token, environment.JWT_SECRET);

        if (payload.role !== 'admin') {
            res.status(403).send({ error: "You are not an admin" });
            return;
        }

        next();
    } catch (error) {
        res.status(403).send({ error: "Invalid token" });
        return;
    }

};